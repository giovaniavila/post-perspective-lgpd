export const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    
    if (!token) return null;
    
    // Se o token não tiver 3 partes (header, payload, signature), não é válido
    const parts = token.split('.');
    if (parts.length !== 3) return null;
  
    try {
      // Decodifica a parte do payload do token (que está em base64)
      const payload = parts[1];
      
      // Decodifica a base64 para uma string (utf-8)
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  
      // Converte a string em um objeto JSON
      const parsedPayload = JSON.parse(decodedPayload);
  
      console.log("id do userasdasdasdasdasdas", parsedPayload.id); // Para ver o conteúdo do payload
      return parsedPayload.id;
    } catch (error) {
      console.error("Erro ao decodificar o token manualmente", error);
      return null;
    }
  };
  