import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (FnCallBack) => {
    const mutation = useMutation({
        mutationFn: FnCallBack
      });
      return mutation
}