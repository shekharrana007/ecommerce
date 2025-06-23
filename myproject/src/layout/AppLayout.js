import  Header from "./header";
import Footer from "./Footer";


function AppLayout({children}){
    return (
        <>
        <Header/>
        {children}

        <Footer/>
        </>
    );
}
export default AppLayout;