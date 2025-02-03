export const lectureAction = () => [
  {
    title: "Thêm bài giảng",
    onClick: (openModal) => {
      openModal();
    },
  },
  {
    title: "Sửa bài giảng",
    onClick: (openModal) => {
      openModal();
    },
  },
  {
    title: "Xóa bài giảng",
    onClick: (openModal) => {
      openModal();
    },
  },
];
export const lectureData = [
  {
    key: "1",
    topic: "Mô tả chuyển động",
    lesson: "1",
    title: "Chuyển động thẳng",
    video: "link-to-video",
    pdf: "link-to-pdf",
    content: {
      purpose: "Đo được tốc độ tức thời của vật chuyển động.",
      equipment: [
        "Đồng hồ đo thời gian hiện số (Hình 6.1) có sai số dụng cụ 0,001 s.",
        "Máng định hướng thẳng dài khoảng 1 m có đoạn dốc nghiêng (độ dốc không đổi) và đoạn nằm ngang.",
        "Viên bi thép",
        "Thước đo độ có gắn dây dọi",
        "Thước thẳng độ chia nhỏ nhất là 1 mm",
        "Nam châm điện",
        "Hai công quang điện",
        "Công tắc điện",
        "Giá đỡ",
        "Thước kẹp",
      ],
      guide: {
        img: "/images/lesson/img-lesson-1.png",
        steps: [
          "Bố trí thí nghiệm như Hình 6.2. Điều chỉnh đoạn nằm ngang của máng sao cho thước đo độ chỉ giá trị 0°. Cố định nam châm điện và cổng quang điện A (đặt cách chân dốc nghiêng của máng một khoảng 20 cm).",
          ,
          " Chọn MODE ở vị trí A (hoặc B) để đo thời gian viên bi chắn cổng quang điện mà ta muốn đo tốc độ tức thời của viên bị ở vị trí tương ứng.",
          "Sử dụng thước kẹp để đo đường kính của viên bi. Thực hiện đo đường kính viên bi khoảng 5 lần và ghi kết quả vào Bảng 6.1.",
          " Đưa viên bi lại gần nam châm điện sao cho viên bi hút vào nam châm. Ngắt công tắc điện để viên bị bắt đầu chuyển động xuống đoạn dốc nghiêng và đi qua cổng quang điện cần đo thời gian.",
          "Ghi nhận giá trị thời gian hiển thị trên đồng hồ đo vào bảng số liệu như gợi ý trong Bảng 6.2.",
        ],
        note: "Nhấn nút RESET của đồng hồ đo. Thực hiện lại bước 3 và 4 thêm ít nhất 4 lần.",
      },
    },
  },
  {
    key: "2",
    topic: "Mô tả chuyển động",
    lesson: "2",
    title: "Chuyển động tổng hợp",
    video: "link-to-video",
    pdf: "link-to-pdf",
    content: {
      purpose: "Đo được tốc độ tức thời của vật chuyển động.",
      equipment: [
        "Đồng hồ đo thời gian hiện số (Hình 6.1) có sai số dụng cụ 0,001 s.",
        "Máng định hướng thẳng dài khoảng 1 m có đoạn dốc nghiêng (độ dốc không đổi) và đoạn nằm ngang.",
        "Viên bi thép",
        "Thước đo độ có gắn dây dọi",
        "Thước thẳng độ chia nhỏ nhất là 1 mm",
        "Nam châm điện",
        "Hai công quang điện",
        "Công tắc điện",
        "Giá đỡ",
        "Thước kẹp",
      ],
      guide: {
        img: "/images/lesson/img-lesson-1.png",
        steps: [
          "Bố trí thí nghiệm như Hình 6.2. Điều chỉnh đoạn nằm ngang của máng sao cho thước đo độ chỉ giá trị 0°. Cố định nam châm điện và cổng quang điện A (đặt cách chân dốc nghiêng của máng một khoảng 20 cm).",
          ,
          " Chọn MODE ở vị trí A (hoặc B) để đo thời gian viên bi chắn cổng quang điện mà ta muốn đo tốc độ tức thời của viên bị ở vị trí tương ứng.",
          "Sử dụng thước kẹp để đo đường kính của viên bi. Thực hiện đo đường kính viên bi khoảng 5 lần và ghi kết quả vào Bảng 6.1.",
          " Đưa viên bi lại gần nam châm điện sao cho viên bi hút vào nam châm. Ngắt công tắc điện để viên bị bắt đầu chuyển động xuống đoạn dốc nghiêng và đi qua cổng quang điện cần đo thời gian.",
          "Ghi nhận giá trị thời gian hiển thị trên đồng hồ đo vào bảng số liệu như gợi ý trong Bảng 6.2.",
        ],
        note: "Nhấn nút RESET của đồng hồ đo. Thực hiện lại bước 3 và 4 thêm ít nhất 4 lần.",
      },
    },
  },
  {
    key: "3",
    topic: "Mô tả chuyển động",
    lesson: "3",
    title: "Thực hành đo tốc độ của vật chuyển động thẳng",
    video: "link-to-video",
    pdf: "link-to-pdf",
    content: {
      purpose: "Đo được tốc độ tức thời của vật chuyển động.",
      equipment: [
        "Đồng hồ đo thời gian hiện số (Hình 6.1) có sai số dụng cụ 0,001 s.",
        "Máng định hướng thẳng dài khoảng 1 m có đoạn dốc nghiêng (độ dốc không đổi) và đoạn nằm ngang.",
        "Viên bi thép",
        "Thước đo độ có gắn dây dọi",
        "Thước thẳng độ chia nhỏ nhất là 1 mm",
        "Nam châm điện",
        "Hai công quang điện",
        "Công tắc điện",
        "Giá đỡ",
        "Thước kẹp",
      ],
      guide: {
        img: "/images/lesson/img-lesson-1.png",
        steps: [
          "Bố trí thí nghiệm như Hình 6.2. Điều chỉnh đoạn nằm ngang của máng sao cho thước đo độ chỉ giá trị 0°. Cố định nam châm điện và cổng quang điện A (đặt cách chân dốc nghiêng của máng một khoảng 20 cm).",
          ,
          " Chọn MODE ở vị trí A (hoặc B) để đo thời gian viên bi chắn cổng quang điện mà ta muốn đo tốc độ tức thời của viên bị ở vị trí tương ứng.",
          "Sử dụng thước kẹp để đo đường kính của viên bi. Thực hiện đo đường kính viên bi khoảng 5 lần và ghi kết quả vào Bảng 6.1.",
          " Đưa viên bi lại gần nam châm điện sao cho viên bi hút vào nam châm. Ngắt công tắc điện để viên bị bắt đầu chuyển động xuống đoạn dốc nghiêng và đi qua cổng quang điện cần đo thời gian.",
          "Ghi nhận giá trị thời gian hiển thị trên đồng hồ đo vào bảng số liệu như gợi ý trong Bảng 6.2.",
        ],
        note: "Nhấn nút RESET của đồng hồ đo. Thực hiện lại bước 3 và 4 thêm ít nhất 4 lần.",
      },
    },
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
    render: (text, record) => (
      <a
        onClick={() => {
          navigate(`/lesson-detail/${record.key}`, { state: { record } });
        }}
      >
        {text}
      </a>
    ),
  },
  {
    title: "Tựa đề",
    dataIndex: "title",
    key: "title",
    render: (text, record) => (
      <a
        onClick={() => {
          navigate(`/lesson-detail/${record.key}`, { state: { record } });
        }}
      >
        {text}
      </a>
    ),
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
