import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queries/queryKeys";
import { getNickname } from "../services/api";

export const useNickname = () => {
  const queryClient = useQueryClient(); // queryClient를 가져옵니다. 이를 통해 쿼리를 무효화할 수 있습니다.

  // useQuery 훅을 사용하여 닉네임 데이터를 가져옵니다.
  const { data } = useQuery({
    queryKey: queryKeys.nickname, // 쿼리 키를 설정합니다.
    queryFn: async () => await getNickname(), // 쿼리 함수로 getNickname API 호출을 설정합니다.
    staleTime: Infinity, // 데이터가 무효화되지 않도록 설정합니다.
  });

  // 데이터가 없는 경우 초기값을 반환합니다.
  if (!data) {
    return {
      nickname: null, // 닉네임이 없는 경우 null을 반환합니다.
      revalidate: () => {}, // revalidate 함수는 빈 함수로 설정합니다.
    };
  }

  // 데이터가 있는 경우 닉네임과 revalidate 함수를 반환합니다.
  return {
    nickname: data, // 닉네임 데이터를 반환합니다.
    revalidate: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.nickname, // 쿼리 키를 사용하여 쿼리를 무효화합니다.
      }),
  };
};
