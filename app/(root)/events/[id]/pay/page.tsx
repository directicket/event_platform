import Payment from '@/components/shared/Pay';
import { getEventById } from '@/lib/actions/event.actions';

const PayPage = async ({ params }: { params: { id: string } }) => {
  const event = await getEventById(params.id);

  return (
    <div className="wrapper md:max-w-4xl text-white grid grid-cols-1 gap-2 md:gap-4 justify-center items-center">
      {/* just pass params and event to the Payment component */}
      <Payment params={params} />
    </div>
  );
};

export default PayPage;
