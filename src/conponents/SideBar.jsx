import {
  Button,
  Navbar,
  useThemeMode
} from "flowbite-react";
import { useState } from "react";
import { FaRegSun } from "react-icons/fa";
import { LuMoon } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import AddPost from "./AddPost";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { toggleMode, mode } = useThemeMode();


      const handleCreateClick = () => {
        setCreateModalOpen(true);
    };

  return (
    <>
      <Navbar fluid rounded className=" dark:bg-slate-900">
        <Navbar.Brand>
          
          <span className="self-center whitespace-nowrap text-xl font-extrabold   text-orange-500 dark:text-white" onClick={()=> { navigate('/')}}>
        Blogger
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2">
       
           {/* <Button size="xs" className='m-2' onClick={handleCreateClick}>Click me to add post!</Button> */}
          <span
            className="cursor-pointer flex items-center mr-2"
            onClick={toggleMode}
          >
            {mode === "light" ? (
              <LuMoon size={"20"} className="text-gray-400" />
            ) : (
              <FaRegSun size={"20"} className="text-yellow-300" />
            )}
          </span>
          <span className="cursor-pointer flex items-center">
         
          </span>
         
        </div>
      </Navbar>
     <AddPost isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />
    </>
  );
};

export default SideBar;
