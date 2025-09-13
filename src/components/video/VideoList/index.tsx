const VIDEO = {
  POV_1: 'SBRRzHnNvEM',
  VLOG_8: 'jz_XBVZ3hFU',
  FINLAND_1: '-RDEQfHhwpU',
  FINLAND_2: 'LPk99-ROE-g',
  FINLAND_3: 'Uh-oc8PVkSA',
  GERMANY: 'viOCUAZ_dR8',
  AIZU: 'idDzRHMHjV8',
} as const;

function getSrc(video: (typeof VIDEO)[keyof typeof VIDEO]) {
  return `https://www.youtube.com/embed/${video}?playsinline=1`;
}

type videoListProps = {
  src: string;
  title: string;
  date: string;
};
const videoList: videoListProps[] = [
  {
    src: getSrc(VIDEO.POV_1),
    title: 'POV vlog#1',
    date: '2024.08.11',
  },
  {
    src: getSrc(VIDEO.VLOG_8),
    title: 'vlog#8',
    date: '2023.10.28-2023.10.29',
  },
  {
    src: getSrc(VIDEO.FINLAND_3),
    title: 'Finland Vlog 3',
    date: '2019.12.06-2019.12.07',
  },
  {
    src: getSrc(VIDEO.FINLAND_2),
    title: 'Finland Vlog 2',
    date: '2019.12.05-2019.12.06',
  },
  {
    src: getSrc(VIDEO.FINLAND_1),
    title: 'Finland Vlog 1',
    date: '2019.12.01-2019.12.05',
  },
  {
    src: getSrc(VIDEO.GERMANY),
    title: 'Germany Vlog',
    date: '2019.09.15-2019.12.20',
  },
  {
    src: getSrc(VIDEO.AIZU),
    title: 'AizuKomagadake Vlog',
    date: '2019.08.17-2019.08.18',
  },
];

export const VideoList = () => {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {videoList.map((video, index) => (
        <li key={index} className="flex flex-col gap-2">
          <div className="aspect-video bg-black">
            <iframe src={video.src} className="h-full w-full" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-stone-700">{video.title}</p>
            <p className="text-sm text-stone-500">{video.date}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
