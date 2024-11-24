import { useQuery } from "@tanstack/react-query";
import { getTermsAndConditions } from "../api/termsAndConditions";

export const useTerms = () => {
  const { data } = useQuery({
    queryKey: ["terms"],
    queryFn: getTermsAndConditions,
  });
  return { data };
};
