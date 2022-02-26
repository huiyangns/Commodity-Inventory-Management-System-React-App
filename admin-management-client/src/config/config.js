import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    TeamOutlined,
    ContainerOutlined,
    UnorderedListOutlined,
    HomeOutlined,
    BarChartOutlined,
    LineChartOutlined,
    RadarChartOutlined,
  } from '@ant-design/icons';

const menuList = [
  {
    title: "Home", // menu title
    key: "/home", // corresponding path
    icon: <HomeOutlined />, // specific icon
    isPublic: true,
  },
  {
    title: "Merchandise",
    key: "/products",
    icon: <AppstoreOutlined/>,
    children: [
      // submenu
      {
        title: "Category",
        key: "/category",
        icon: <UnorderedListOutlined />,
      },
      {
        title: "Product",
        key: "/product",
        icon: <MenuUnfoldOutlined/>,
      },
    ],
  },
  {
    title: "User Management",
    key: "/user",
    icon:<TeamOutlined />,
  },
  {
    title: "Role Management",
    key: "/role",
    icon: <ContainerOutlined />,
  },
  {
    title: "Charts",
    key: "/charts",
    icon: <RadarChartOutlined />,
    children: [
      {
        title: "Bar Chart",
        key: "/charts/bar",
        icon: <BarChartOutlined />,
      },
      {
        title: "Line Chart",
        key: "/charts/line",
        icon: <LineChartOutlined />,
      },
      {
        title: "Pie Chart",
        key: "/charts/pie",
        icon: <PieChartOutlined />,
      },
    ],
  },
];
export default menuList;
