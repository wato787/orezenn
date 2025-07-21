import { useQuery } from "@tanstack/react-query";

// テスト用のダミーAPI
const fetchTestData = async (): Promise<{
  message: string;
  timestamp: number;
}> => {
  // 実際のAPIの代わりにPromiseでダミーデータを返す
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1秒待機
  return {
    message: "TanStack Query が正常に動作しています！",
    timestamp: Date.now(),
  };
};

export const QueryTest = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["test-data"],
    queryFn: fetchTestData,
  });

  if (isLoading) {
    return (
      <div className="p-6 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span className="text-blue-700">
            TanStack Query でデータを取得中...
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-50 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">
          エラーが発生しました
        </h3>
        <p className="text-red-600 mb-4">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
        <button
          onClick={() => refetch()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-green-50 rounded-lg">
      <h3 className="text-green-800 font-semibold mb-4">
        🎉 TanStack Query 動作確認
      </h3>
      <div className="space-y-2">
        <p className="text-green-700">
          <strong>メッセージ:</strong> {data?.message}
        </p>
        <p className="text-green-600">
          <strong>取得時刻:</strong>{" "}
          {data?.timestamp ? new Date(data.timestamp).toLocaleString() : "N/A"}
        </p>
      </div>
      <button
        onClick={() => refetch()}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200"
      >
        データを再取得
      </button>
    </div>
  );
};
