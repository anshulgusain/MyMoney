import { Link } from "react-router-dom"

const Appbar = () => {
    return <div className="shadow h-14 flex justify-between bg-blue-300">
        <Link to={"/"} className="text-xl textcolor-blue font-bold flex flex-col justify-center h-full ml-4">
            MyMoney App
        </Link>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <Link to={"/signup"}  className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div to={"/signup"} className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </Link>
        </div>
    </div>
}

export default Appbar