import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { icons } from "../constants";

// Memoize VideoCard to prevent unnecessary re-renders
const VideoCard = React.memo(({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {
    const [play, setPlay] = useState(false);

    // Initialize the video player
    const player = useVideoPlayer(video, (player) => {
        player.loop = false;
        if (play) {
            player.play();
        }
    });

    // Sync play state with player
    useEffect(() => {
        if (play) {
            player.play();
        } else {
            player.pause();
        }
    }, [play, player]);

    // Debugging: Log video data
    console.log("VideoCard data:", { title, thumbnail, video, username, avatar });

    // Defensive check for video data
    if (!video || !thumbnail) {
        return <Text className="text-white">Invalid video data</Text>;
    }

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] border border-secondary justify-center items-center p-0.5">
                        <Image
                            source={{ uri: avatar || "https://via.placeholder.com/46" }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                            {title || "Untitled"}
                        </Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                            {username || "Unknown Creator"}
                        </Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>

            {play ? (
                <VideoView
                    style={{
                        width: "100%",
                        height: 240, // Adjusted height to match className
                        borderRadius: 12, // Matches rounded-xl (approx)
                        marginTop: 12,
                    }}
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                    nativeControls // Use native controls (equivalent to useNativeControls)
                    onError={(error) => {
                        console.log("Video error:", error);
                        setPlay(false);
                    }}
                    onPlaybackStatusUpdate={(status) => {
                        if (status.isLoaded && status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                >
                    <Image
                        source={{ uri: thumbnail || "https://via.placeholder.com/300x200.png?text=No+Image" }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
});

export default VideoCard;

