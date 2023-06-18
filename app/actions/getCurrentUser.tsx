export default function getCurrentUser() {
  if (typeof window !== "undefined") {
    const currentUser = localStorage.getItem("user");

    return {
      currentUser,
    };
  }else{
    
  }
}
