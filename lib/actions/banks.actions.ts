import mongoose from "mongoose";
import Bank from "@/lib/database/models/banks.model"; // assuming your model file exports the schema

// create a bank document
export async function createBank(accountName: string, bankName: string, accountNumber: string, organizer: string) {
  if (!accountName || !bankName || !accountNumber || !organizer) {
    throw new Error("All fields are required");
  }

  try {
    // check if accountNumber already exists
    const existingBank = await Bank.findOne({ accountNumber });
    if (existingBank) {
      throw new Error("Bank account with this number already exists");
    }

    // create and save the bank document
    const newBank = new Bank({
      accountName,
      bankName,
      accountNumber,
      organizer,
    });

    const savedBank = await newBank.save();
    return savedBank;
  } catch (error) {
    console.error(error || 'Couldnt create bank document.');
  }
}
