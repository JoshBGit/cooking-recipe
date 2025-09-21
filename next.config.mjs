/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        ppr: 'incremental',
        after: true,
    },
    devIndicatore:{
        appIsrStatus: true,
        buildActivity: true,
        buildActivityPosition: "bottom-right",
    },
};

export default nextConfig;
