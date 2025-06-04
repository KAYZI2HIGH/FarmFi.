import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth, User } from "@/context/AuthContext";
import Cookies from "js-cookie";
import { useToast } from "@/components/custom-ui/toast";

export const useUpdateProfile = () => {
  const { user, login } = useAuth();
  const { toast} = useToast()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<User>) => {
      const response = await fetch(
        `https://farmfi-node.onrender.com/auth/update/${user?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log(data)
      if (data.user) {
        login(Cookies.get("authToken")!, data.user); 
      }

      queryClient.setQueryData(["user", user?._id], data.user);
      toast({
        message: "User profile updated successfully!",
        duration: 3000
      })
    },
  });
};
