import axios from "axios";
import { TermsAndConditionsProps } from "../interface/terms";

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
