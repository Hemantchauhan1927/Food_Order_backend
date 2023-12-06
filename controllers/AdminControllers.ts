import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      address,
      pincode,
      foodType,
      email,
      password,
      ownerName,
      phone,
    } = <CreateVendorInput>req.body;

    // checking whether vendor exist or not.
    const existingVendor = await Vendor.findOne({ email: email });
    if (existingVendor !== null) {
      return res
        .status(400)
        .json({ message: "A Vendor is exists with this email id" });
    }

    // generate a salt
    const salt = await GenerateSalt();
    //  encrypt the password using the salt.
    const userPassword = await GeneratePassword(password, salt);

    // create new vendor
    const createVendor = await Vendor.create({
      name: name,
      address: address,
      pincode: pincode,
      foodType: foodType,
      email: email,
      password: userPassword,
      salt: salt,
      ownerName: ownerName,
      phone: phone,
      rating: 0,
      serviceAvailable: false,
      coverImage: [],
    });
    return res.json(createVendor);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json("vendor list will send soon");
};
export const GetVendorsByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json("vendor list will send soon");
};

export const UpdateVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json("Vendor created successfully");
};

export const DeleteVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json("Vendor deleted successfully");
};
