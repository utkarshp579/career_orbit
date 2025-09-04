/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "randomuser.me",
            }
        ]
    }
};

export default nextConfig;


// about different kind of Routes in next.js
// [] dynamic route 
//() farzi route to group
//[...adalda] catch all route of dyanamic
// _sfkflakdm  ignored  completely subfolder also