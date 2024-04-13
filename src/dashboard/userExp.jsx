import { Progress, Card } from "react-daisyui";
import { FaMedal } from "react-icons/fa6";
export default function userExp() {
    return (<>
        <h2 className="mb-2 text-lg font-semibold text-left">For you</h2>
        <Card className="flex h-20 mb-2 bg-slate-50">
            <Card.Body>
            <div className="flex space-x-2 text-xs">
            <FaMedal className="text-green-400" size={16}/>
            <span>Lv.1</span>
            <div>
            <Progress className="relative mt-2 mb-1 w-60 lg:w-52" value={100} max={180} color="accent" /></div>
            <span className="mt-1 ml-3 text-xs text-green-600">100/180</span>
            </div>
            </Card.Body>
        </Card>
        {/* <progress class="progress progress-accent w-56" value="70" max="100"></progress> */}
    </>);
}