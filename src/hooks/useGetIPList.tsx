import { useEffect, useState } from "react";
import type { IIPInstance } from "../types";

interface IGetIPListData {
  ipList: IIPInstance[];
}

const MOCK_IP_LIST: IIPInstance[] = [
  {
    id: "1",
    name: "(JPN)Kumamon",
    imgUrl: "/kumamon.png",
    lastSync: "Last Sync 2 Hours Ago",
  },
  {
    id: "2",
    name: "(EN)Kirarin",
    imgUrl: "/kirarin.png",
    lastSync: "Last Sync 2 Hours Ago",
  },
  {
    id: "3",
    name: "(CN)Maru",
    imgUrl: "/maru.png",
    lastSync: "Last Sync 2 Hours Ago",
  },
];

const useGetIPList = (): IGetIPListData => {
  const [ipList, setIPList] = useState<IIPInstance[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIPList(MOCK_IP_LIST);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return { ipList };
};

export default useGetIPList;
