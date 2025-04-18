"use client";

import { useEffect, useState } from "react";

const ValidateQR = ({ params }: { params: { finalCode: string } }) => {
  const [validationStatus, setValidationStatus] = useState<string | null>(null);

  useEffect(() => {
    const validateQRCode = async () => {
      try {
        const response = await fetch(`/api/validate-qr/${params.finalCode}`);
        const data = await response.json();

        if (data.valid) {
          setValidationStatus("QR Code validated successfully.");
        } else {
          setValidationStatus("QR Code is invalid or has already been used.");
        }
      } catch (error) {
        setValidationStatus("Error validating QR Code.");
        console.error(error);
      }
    };

    validateQRCode();
  }, [params.finalCode]);

  return (
    <div className="flex flex-col gap-2 text-white items-center justify-center text-center h-screen">
      <div className='self-center'>
        <h1 className='h3-bold tracking'>validator</h1>
        <p>{validationStatus ? validationStatus : 'Please wait, Ticket is being checked...'}</p>
      </div>
    </div>
  );
};

export default ValidateQR;
