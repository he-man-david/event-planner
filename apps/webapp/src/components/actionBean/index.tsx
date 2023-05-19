interface ActionBeanProps {
  text: string;
}

const ActionBean = ({ text }: ActionBeanProps) => {
  return (
    <div className="text-center rounded-2xl ring-1 ring-slate-100 text-white font-medium hover:bg-green-500 hover:text-gray-700 hover:cursor-pointer">
      {text}
    </div>
  );
};

export default ActionBean;
