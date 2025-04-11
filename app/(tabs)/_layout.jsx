import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

// Tab Icon component to show icon and text with proper styling
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center space-y-1">
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          tintColor: color,
          width: focused ? 30 : 24, // Increase size for active tab
          height: focused ? 30 : 24, // Increase size for active tab
        }}
      />
      <Text
        className={`${focused ? "font-semibold" : "font-medium"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001", // Active tab color
          tabBarInactiveTintColor: "#CDCDE0", // Inactive tab color
          tabBarShowLabel: false, // Disable text labels
          tabBarStyle: {
            backgroundColor: "#161622",
            // borderTopWidth: 0.5,
            // borderTopColor: "#232533", 
            paddingBottom: 10,
            paddingTop: 20,
            height: 80,
            // shadowColor: "#000", 
            // shadowOffset: { width: 0, height: -2 },
            // shadowOpacity: 0.1,
            // shadowRadius: 4,
            // elevation: 5,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.bookmark} color={color} name="Book" focused={focused} />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} name="Create" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
