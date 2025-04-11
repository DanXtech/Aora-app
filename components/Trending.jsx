// import { useState } from "react";
// import { Video } from "expo-video";
// import * as Animatable from "react-native-animatable";
// import {
//   FlatList,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
// } from "react-native";

// import { icons } from "../constants";

// const zoomIn = {
//   0: {
//     scale: 0.9,
//   },
//   1: {
//     scale: 1,
//   },
// };

// const zoomOut = {
//   0: {
//     scale: 1,
//   },
//   1: {
//     scale: 0.9,
//   },
// };

// const TrendingItem = ({ activeItem, item }) => {
//   const [play, setPlay] = useState(false);

//   return (
//     <Animatable.View
//       className="mr-5"
//       animation={activeItem === item.$id ? zoomIn : zoomOut}
//       duration={500}
//     >
//       {play ? (
//         <Video
//           source={{ uri: item.video }}
//           className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
//           resizeMode="contain"
//           useNativeControls
//           shouldPlay
//           onPlaybackStatusUpdate={(status) => {
//             if (status.didJustFinish) {
//               setPlay(false);
//             }
//           }}
//         />
//       ) : (
//         <TouchableOpacity
//           className="relative flex justify-center items-center"
//           activeOpacity={0.7}
//           onPress={() => setPlay(true)}
//         >
//           <ImageBackground
//             source={{
//               uri: item.thumbnail,
//             }}
//             className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
//             resizeMode="cover"
//           />

//           <Image
//             source={icons.play}
//             className="w-12 h-12 absolute"
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       )}
//     </Animatable.View>
//   );
// };

// const Trending = ({ posts }) => {
//   const [activeItem, setActiveItem] = useState(posts[0]);

//   const viewableItemsChanged = ({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setActiveItem(viewableItems[0].key);
//     }
//   };

//   return (
//     <FlatList
//       data={posts}
//       horizontal
//       keyExtractor={(item) => item.$id}
//       renderItem={({ item }) => (
//         <TrendingItem activeItem={activeItem} item={item} />
//       )}
//       onViewableItemsChanged={viewableItemsChanged}
//       viewabilityConfig={{
//         itemVisiblePercentThreshold: 70,
//       }}
//       contentOffset={{ x: 170 }}
//     />
//   );
// };

// export default Trending;
import React, { useState, useEffect } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import * as Animatable from "react-native-animatable";
import { FlatList, Image, ImageBackground, TouchableOpacity, Text, View } from "react-native";
import { icons } from "@/constants";

const zoomIn = { 0: { scale: 0.9 }, 1: { scale: 1.1 } };
const zoomOut = { 0: { scale: 1 }, 1: { scale: 0.9 } };

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const player = useVideoPlayer(item.video, (player) => {
    player.loop = false;
    if (play) {
      player.play();
    }
  });


  useEffect(() => {
      if (play) {
        player.play();
        setIsLoading(true)
      } else {
        player.pause();
        setIsLoading(false)
      }
    }, [play, player]);
  
    // Debugging: Log video data
    console.log("Trending data:", { item });
  
    // Defensive check for video data
    if (!item) {
      return <Text className="text-white">Invalid video data</Text>;
    }

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View className="w-52 h-72 rounded-[35px] mt-3 relative justify-center items-center">
          <VideoView
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 35,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
            player={player}
            allowsFullscreen
            nativeControls
            onError={(error) => {
              console.log("Video error:", error);
              setPlay(false);
              setIsLoading(false);
            }}
          />
          {isLoading && <Text className="text-white absolute">Loading...</Text>}
        </View>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const MemoizedTrendingItem = React.memo(TrendingItem);

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id || null);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.$id);
    }
  };

  if (!posts || posts.length === 0) {
    return <Text className="text-white">No trending videos available</Text>;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <MemoizedTrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default Trending;