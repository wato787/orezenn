import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreateLink, useUpdateLink } from "@/hooks/useLinks";
import type { Link } from "@/types/api";
import { useState } from "react";

interface LinkFormProps {
  link?: Link;
  onSuccess?: () => void;
}

interface LinkFormData {
  link: string;
  description: string;
}

export const LinkForm = ({ link, onSuccess }: LinkFormProps) => {
  const [formData, setFormData] = useState<LinkFormData>({
    link: link?.link || "",
    description: link?.description || "",
  });
  const [errors, setErrors] = useState<Partial<LinkFormData>>({});

  const createLink = useCreateLink();
  const updateLink = useUpdateLink();

  const isEditing = !!link;

  const validateForm = (): boolean => {
    const newErrors: Partial<LinkFormData> = {};

    if (!formData.link.trim()) {
      newErrors.link = "URLは必須です";
    } else if (!isValidUrl(formData.link)) {
      newErrors.link = "有効なURLを入力してください";
    }

    if (!formData.description.trim()) {
      newErrors.description = "説明は必須です";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const linkData = {
      link: formData.link.trim(),
      description: formData.description.trim(),
    };

    try {
      if (isEditing && link) {
        await updateLink.mutateAsync({ id: link.id, content: linkData });
      } else {
        await createLink.mutateAsync(linkData);
      }
      // フォームをリセット
      setFormData({ link: "", description: "" });
      onSuccess?.();
    } catch (error) {
      console.error("リンクの保存に失敗しました:", error);
      alert("リンクの保存に失敗しました");
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex items-center w-full"
        >
          {/* URL */}
          <div className="flex gap-2 w-full">
            <div className="w-1/3">
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, link: e.target.value }))
                }
                placeholder="https://example.com"
                className={errors.link ? "border-red-500" : ""}
              />
              {errors.link && (
                <p className="text-sm text-red-500 mt-1">{errors.link}</p>
              )}
            </div>

            {/* 説明 */}
            <div className="w-1/3">
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="記事の概要"
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* ボタン */}
            <div className=" w-1/3">
              <Button
                type="submit"
                disabled={createLink.isPending || updateLink.isPending}
                className="flex-1"
              >
                {isEditing ? "更新" : "追加"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
