import Image from "next/image"

const ProfileImageComponent = ({ photoURL } : { photoURL: string }) => {
    return (
        <Image className="rounded-full" src={photoURL} width={160} height={160} alt="Profile picture" />
    )
}

export default ProfileImageComponent;