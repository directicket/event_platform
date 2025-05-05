"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router
import { IBM_Plex_Mono } from 'next/font/google';
import Footer from "@/components/shared/Footer";
import { IdCard } from "lucide-react";

const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] })

export default function BankDetailsPage() {
  const { user } = useUser();
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    bankName: "",
    bankCode: "", 
  });
  const [banks, setBanks] = useState<{ id: string; name: string; code: string }[]>([]);
  const [accountName, setAccountName] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    async function fetchBanks() {
      try {
        const response = await fetch("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        });
        const data = await response.json();
        console.log("Fetched banks:", data);
        setBanks(data.data || []);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    }
    fetchBanks();
  }, []);

  const verifyAccount = async () => {
    if (!bankDetails.accountNumber || !bankDetails.bankCode) return;
  
    try {
      console.log("Verifying account with details:", bankDetails);
  
      const response = await fetch("/api/verify-bank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountNumber: bankDetails.accountNumber,
          bankCode: bankDetails.bankCode,
        }),
      });
  
      const data = await response.json();
      console.log("Verification response:", data);
  
      if (response.ok) {
        setAccountName(data.data.account_name);
        setVerified(true);
      } else {
        setAccountName(data.error || "Invalid account details");
        setVerified(false);
      }
    } catch (error) {
      console.error("Error verifying account:", error);
      setAccountName("Error verifying account");
      setVerified(false);
    }
  };

  const router = useRouter();

  const createSubaccount = async () => {
    if (!user || !verified) return;
    
    try {
      console.log("Creating Paystack subaccount...");
      const response = await fetch("/api/create-subaccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          name: accountName,
          email: user.primaryEmailAddress?.emailAddress,
          accountNumber: bankDetails.accountNumber,
          bankCode: bankDetails.bankCode,
          bankName: bankDetails.bankName,
        }),
      });
      
      const data = await response.json();
      console.log("Subaccount creation response:", data);

      if (response.ok) {
        // Assuming `data.hasAccess` is returned as `true` if subaccount is created
        const status = "true"; // This is the value you want to store
        localStorage.setItem(`bank-details-${user.id}`, JSON.stringify(status));
  
        router.push("/events/create");  // Redirect after success
      }

    } catch (error) {
      console.error("Error creating subaccount:", error);
    }
  };

  const resetForm = () => {
    setAccountName("");
    setVerified(false);
  };

  if (!user) return (<><div className="wrapper w-full h-[100%]"><p className='text-white text-center'>Loading...</p></div></>);

  return (
    <>
    <div className='wrapper p-8 my-40'>
    <div className="wrapper max-w-4xl mt-10 p-4 text-white flex flex-col items-center justify-center mx-auto bg-neutral-950 border border-neutral-800/70">
      <div className="flex flex-row gap-[5.5px] self-start">
            <IdCard width={22} height={22} className='text-blue-700 self-center'/>
            <p className={`${ibmMono.className} ibm-16 font-medium text-white self-center`}>BANK DETAILS</p>
          </div>
      <p className="p-regular-14 text-left text-neutral-500 md:max-w-[55%] mb-4">
          If you've done this before you do not need to do it again.
      </p>

      <hr className="border border-dashed border-neutral-800 mb-4 w-full"/>

      <div className="w-full flex justify-center items-center">
        <form className="space-y-4 max-w-2xl w-full flex flex-col items-center">
          <div className="w-full p-regular-16 p-2 text-white rounded-none border border-neutral-600/50 bg-neutral-900 ">
            <select
              className="w-full bg-neutral-900 outline-none outline-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                const selectedBank = banks.find((bank) => bank.name === e.target.value);
                setBankDetails({ ...bankDetails, bankName: e.target.value, bankCode: selectedBank?.code || "" });
                resetForm();
              }}
            >
              <option value="">Select Bank</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.name}>{bank.name}</option>
              ))}
            </select>
          </div>
          <Input
            type="tel" inputMode="numeric"
            placeholder="Account Number"
            value={bankDetails.accountNumber}
            className="p-regular-16 text-white rounded-none border border-neutral-600/50 bg-neutral-900 outline-offset-0 focus-visible:ring-white focus-visible:ring-offset-0"
            onChange={(e) => {
              setBankDetails({ ...bankDetails, accountNumber: e.target.value });
              resetForm();
            }}
          />
          <Button type="button" size='lg' className={`text-left rounded-none
           w-full bg-blue-600 hover:bg-blue-600/80 text-white border-blue-700/70 border ${ibmMono.className}`} 
           onClick={verified ? createSubaccount : verifyAccount}>
            {verified ? 
                <div className='flex flex-col w-full'>
                <p className={`${ibmMono.className} text-white w-full text-left ibm-16 md:ibm-16 text-wrap p-3`}>
                    CONFIRM & ADD:
                </p>
                {accountName && (
                <>
                <hr className='hidden border border-dashed border-black my-1'/>
                <p className={`${ibmMono.className} text-white w-full 
                text-left ibm-16 md:ibm-16 text-wrap p-3 underline`}>{accountName}</p>
                </>
                )}
                </div>
            : 
            <div className='flex flex-col w-full'>
                <p className={`${ibmMono.className} text-white w-full text-left ibm-16 md:ibm-16 text-wrap p-3`}>
                    NEXT
                </p>
            </div>
            }
          </Button>
        </form>
      </div>
    </div>
    </div>

    <div className='text-white wrapper'>
      <Footer />
      </div>
    </>
  );
}
