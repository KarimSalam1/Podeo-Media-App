import MediaPlayer from "@/components/MediaPlayer/MediaPlayer";
import Navigation from "@/components/Navigation/Navigation";

export default function Home() {
  return (
    <div>
      <Navigation />
      <div className="container" style={{ paddingTop: "40px" }}>
        <MediaPlayer />
      </div>
    </div>
  );
}
