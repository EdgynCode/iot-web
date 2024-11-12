export const lectureAction = [
  {
    title: "New",
    onclick: () => {
      console.log("New");
    },
  },
  {
    title: "Import",
    onclick: () => {
      console.log("Import");
    },
  },
  {
    title: "Export",
    onclick: () => {
      console.log("Export");
    },
  },
];
export const lectureData = [
  {
    key: "1",
    topic: "Mô tả chuyển động",
    lesson: "4",
    title: "Chuyển động thẳng",
    video: "link-to-video",
    pdf: "link-to-pdf",
  },
  {
    key: "2",
    topic: "Mô tả chuyển động",
    lesson: "5",
    title: "Chuyển động tổng hợp",
    video: "link-to-video",
    pdf: "link-to-pdf",
  },
  {
    key: "3",
    topic: "Mô tả chuyển động",
    lesson: "6",
    title: "Thực hành đo tốc độ của vật chuyển động thẳng",
    video: "link-to-video",
    pdf: "link-to-pdf",
  },
];
export const publisherMenu = [
  { key: "1", label: "Chân trời sáng tạo" },
  { key: "2", label: "Kết nối tri thức" },
];
export const gradeMenu = [
  { key: "1", label: "Khối 10" },
  { key: "2", label: "Khối 11" },
  { key: "3", label: "Khối 12" },
  { key: "4", label: "Tự do" },
];
export const chapterMenu = [
  { key: "1", label: "Mở đầu", publisherId: 1 },
  { key: "2", label: "Mô tả chuyển động", publisherId: 1 },
  { key: "3", label: "Chuyển động biến đổi", publisherId: 1 },
  {
    key: "4",
    label: "Ba định luật Newton. Một số lực trong thực tiễn",
    publisherId: 1,
  },
  { key: "5", label: "Moment lực. Điều kiện cân bằng", publisherId: 1 },
  { key: "6", label: "Năng lượng", publisherId: 1 },
  { key: "7", label: "Động lượng", publisherId: 1 },
  { key: "8", label: "Chuyển động tròn", publisherId: 1 },
  { key: "9", label: "Biến dạng của vật rắn", publisherId: 1 },
];
export const lectureFilter = [
  { key: "NXB", label: "Nhà xuất bản", options: publisherMenu },
  { key: "Grade", label: "Khối", options: gradeMenu },
  { key: "Chapter", label: "Chương", options: chapterMenu },
];
export const columns = (navigate) => [
  {
    title: "Chương",
    dataIndex: "topic",
    key: "topic",
  },
  {
    title: "Bài",
    dataIndex: "lesson",
    key: "lesson",
    render: (text) => <a onClick={() => navigate(`/lesson-detail`)}>{text}</a>,
  },
  {
    title: "Tựa đề",
    dataIndex: "title",
    key: "title",
    render: (text) => <a onClick={() => navigate(`/lesson-detail`)}>{text}</a>,
  },
  {
    title: "Video",
    dataIndex: "video",
    key: "video",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "File PDF",
    dataIndex: "pdf",
    key: "pdf",
    render: (text) => <a>{text}</a>,
  },
];
