import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='flex flex-col min-h-screen'>
            <Navbar />

            <div className='flex-1 mt-25'>{children}</div>

            <Footer />
        </main>
    )
}