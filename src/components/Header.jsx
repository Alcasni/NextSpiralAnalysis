// 'use client';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function Header(){
//     return (
//         <div>
//         <div className="video">
//                 <video src="Icons/indexBackgroundVid.mp4.mp4" id="vid" autoPlay loop muted></video>
//             </div>

//             <header className="heading">
//                 <Link href="/">
//                     <h1 id="projectName">
//                         <Image src="/Icons/generated-icon-removebg.png" width={50} height={50} alt="Logo" priority />
//                         Spiral Analysis
//                     </h1>
//                 </Link>
//                 <ul className="navItems">
//                     <li><Link href="/"><span>Home</span></Link></li>
//                     <li><Link href="/machine"><span>Spiral Analysis</span></Link></li>
//                     <li><Link href="/"><span>Learn More</span></Link></li>
//                     <li><Link href="/info"><span>About Us</span></Link></li>
//                     <li><Link href="/login"><span>Login</span></Link></li>
//                 </ul>
//             </header>
//         </div>
//     )
// }


"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/authProvider"; // ✅ Import user authentication state
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Header() {
    const { user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login"); // ✅ Redirect to login page after logout
    };

    return (
        <div>
            <div className="video">
                <video src="/Icons/indexBackgroundVid.mp4.mp4" id="vid" autoPlay loop muted></video>
            </div>

            <header className="heading">
                <Link href="/">
                    <h1 id="projectName">
                        <Image src="/Icons/generated-icon-removebg.png" width={50} height={50} alt="Logo" priority />
                        Spiral Analysis
                    </h1>
                </Link>

                <ul className="navItems">
                    <li><Link href="/"><span>Home</span></Link></li>
                    <li><Link href="/machine"><span>Spiral Analysis</span></Link></li>
                    <li><Link href="/"><span>Learn More</span></Link></li>
                    <li><Link href="/info"><span>About Us</span></Link></li>
                    {user ? (
                        <>
                            <li><span>{user.email}</span></li>
                            <li><button onClick={handleLogout} className="logoutBtn"  style={{background: "transparent",border:'none'}}><span>Logout</span></button></li>
                        </>
                    ) : (
                        <li><Link href="/login"><span>Login</span></Link></li>
                    )}
                </ul>
            </header>
        </div>
    );
}

