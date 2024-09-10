import dynamic from "next/dynamic";

const DynamicQuill = dynamic(() => import("react-quill"), { ssr: false });

export default DynamicQuill;
