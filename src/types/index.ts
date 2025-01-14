import { Document } from "mongoose";

export interface IUser extends Document{
	firstName: string;
	lastName: string;
	email: string;
  photoUrl: string;
	ads: IAd[];
}

export interface IAd extends Document{
	creatorName: string;
	script: string;
	mediaUrl: string[];
	resolution: 'fhd' | '4k';
	generatedAdUrl: string;
}
