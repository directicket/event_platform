"use client";

import { useEffect, useState } from "react";

const ValidateQR = ({ params }: { params: { finalCode: string } }) => {
  const [validationStatus, setValidationStatus] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // State to store user data

  useEffect(() => {
    const validateQRCode = async () => {
      try {
        const response = await fetch(`/api/validate-qr/${params.finalCode}`);
        const data = await response.json();

        if (data.valid) {
          setValidationStatus("QR Code validated successfully.");
          setUser(data.user); // Set the user data from the API response
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
        <h1 className='h3-bold tracking'>Validator</h1>
        <p>{validationStatus ? validationStatus : 'Please wait, Ticket is being checked...'}</p>
        
        {/* Conditionally render user info if available */}
        {user && (
          <div className="mt-4">
            <h2 className="text-xl">Ticket holder details:</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Add any other user data you want to display */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateQR;
