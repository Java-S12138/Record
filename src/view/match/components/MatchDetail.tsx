import MatchDetailItem from "./MatchDetailItem";
import MatchDetailHeader from "./MatchDetailHeader";

export default function () {

  return (
    <div className='flex flex-col h-full gap-y-10'>
      <MatchDetailHeader/>
      <div className='grow'>
        <div className='matchContain'>
          <MatchDetailItem/>
        </div>
      </div>
    </div>
  )
}
