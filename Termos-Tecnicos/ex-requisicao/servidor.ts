import index from "./index-requisicao.html";

function getCurrentTimeBr() {
  const now = new Date();
  return now.toLocaleTimeString("pt-BR");
} 

const server = Bun.serve({ 

  port: 3000,
  routes: { 
    
    "/": index,
    "/time": () => new Response(getCurrentTimeBr()) 
  }},
);

console.log(`Server running at ${server.url}`); 


