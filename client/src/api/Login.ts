import axios from "axios";

export const postLogin = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      credentials
    );
    const { token } = response.data;

    if (token) {
      localStorage.setItem("authToken", token);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao fazer login");
    } else {
      throw new Error("Erro desconhecido ao fazer login");
    }
  }
};
