import axios from "axios";
import { AcceptTermsProps, TermsAndConditionsProps } from "../interface/terms";

export const getTermsAndConditions = async () => {
  const response = await axios.get("http://localhost:3000/terms/");
  return response.data;
};

export const putTermsAndConditions = async (
  updateTerms: TermsAndConditionsProps
): Promise<TermsAndConditionsProps> => {
  const response = await axios.put(
    "http://localhost:3000/terms/1",
    updateTerms,
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  return response.data;
};

export const acceptNewTerms = async (
  userId: number,
  terms_accepted: number
): Promise<AcceptTermsProps> => {
  const response = await axios.put(
    `http://localhost:3000/users-terms/${userId}`,
    { terms_accepted },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  return response.data;
};
