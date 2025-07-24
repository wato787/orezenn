import { createLink, deleteLink, fetchLink, fetchLinks, updateLink } from "@/lib/microcms";
import type { LinkSearchParams } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * リンク一覧取得フック
 */
export const useLinks = (params?: LinkSearchParams) => {
  return useQuery({
    queryKey: ["links", params],
    queryFn: () => fetchLinks(params),
    staleTime: 5 * 60 * 1000, // 5分
  });
};

/**
 * リンク詳細取得フック
 */
export const useLink = (id: string) => {
  return useQuery({
    queryKey: ["link", id],
    queryFn: () => fetchLink(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5分
  });
};

/**
 * リンク作成フック
 */
export const useCreateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: { link: string; description: string; isRead?: boolean }) => createLink(content),
    onSuccess: () => {
      // リンク一覧を再取得
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};

/**
 * リンク更新フック
 */
export const useUpdateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: { link: string; description: string; isRead?: boolean } }) =>
      updateLink(id, content),
    onSuccess: (updatedLink) => {
      // リンク一覧と詳細を再取得
      queryClient.invalidateQueries({ queryKey: ["links"] });
      queryClient.invalidateQueries({ queryKey: ["link", updatedLink.id] });
    },
  });
};

/**
 * リンク削除フック
 */
export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLink(id),
    onSuccess: (_, deletedId) => {
      // リンク一覧を再取得
      queryClient.invalidateQueries({ queryKey: ["links"] });
      // 削除されたリンクの詳細をキャッシュから削除
      queryClient.removeQueries({ queryKey: ["link", deletedId] });
    },
  });
};

/**
 * リンクの既読状態切り替えフック
 */
export const useToggleLinkRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isRead }: { id: string; isRead: boolean }) =>
      updateLink(id, { link: "", description: "", isRead }),
    onSuccess: (updatedLink) => {
      // リンク一覧と詳細を再取得
      queryClient.invalidateQueries({ queryKey: ["links"] });
      queryClient.invalidateQueries({ queryKey: ["link", updatedLink.id] });
    },
  });
};
