import './styles.scss';

interface EventStatusProps {
  status: boolean;
}

const EventStatus = ({ status }: EventStatusProps) => {
  return (
    <div className="flex items-center">
      <div className={status ? 'led-green' : 'led-yellow'}></div>
      <div className="text-slate-800 text-sm ml-2">
        {status ? 'Complete' : 'Planning'}
      </div>
    </div>
  );
};

export default EventStatus;
