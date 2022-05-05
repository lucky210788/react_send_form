import Header from "./components/Header";
import FirstScreen from "./components/FirstScreen";
import GetRequest from "./components/GetRequest";
import PostRequest from "./components/PostRequest";
import SuccessfullyRegistered from "./components/SuccessfullyRegistered";
import useUsers from "./hooks/useUsers";

function App() {
    const auth = useUsers();

    return (
        <div className="">
            <Header/>
            <FirstScreen/>
            <GetRequest/>
            {
                auth.userRegistered
                    ? <SuccessfullyRegistered/>
                    : <PostRequest/>
            }
        </div>
    );
}

export default App;
