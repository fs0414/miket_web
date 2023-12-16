import { Content } from "../layouts/content"
import { Footer } from "../layouts/footer"
import { Header } from "../layouts/header"

export const Page = () => {
    return (
        <div className="flex flex-col h-screen mt-auto">
            <Header />
            <Content />
            <Footer />
        </div>
    )
}