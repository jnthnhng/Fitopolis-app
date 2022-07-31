import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  StreamApp,
  FlatFeed,
  Activity,
  StatusUpdateForm,
  LikeButton,
  UserBar,
  ReactionIcon,
} from 'expo-activity-feed';

import { STREAM_API_KEY, STREAM_APP_ID } from '@env';
import { getStreamClient } from 'getstream';

// Adapted from: https://www.asapdevelopers.com/build-a-global-activity-feed-with-react-native-and-node-js/

export const navigationOptions = ({ navigation }) => ({
  title: 'HOME',
  headerTitleStyle: {
    fontWeight: '500',
    fontSize: 13,
  },
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      style={{ paddingLeft: 15 }}
    >
      <Avatar
        source={(userData) => userData.data.profileImage}
        size={23}
        noShadow
      />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewPost')}
      style={{ paddingRight: 15 }}
    >
      {/* <Image source={''} style={{ width: 23, height: 23 }} /> */}
    </TouchableOpacity>
  ),
});

const ActivityFeed = () => {
  // Hooks
  const [globalToken, setGlobalToken] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to call backend API endpoint to get user private token
  const callApi = async () => {
    const response = await fetch('http://192.168.0.18:3000');
    // console.log(response)
    const userResponse = await response.json();
    return userResponse;
  };

  // When our application starts, we will call the API endpoint
  useEffect(() => {
    callApi().then((response) => {
      // console.log(response);
      setUserToken(response.userToken);
      setGlobalToken(response.globalToken);
      setLoading(false);
    });
  }, []);

  // // GetStream API KEY and APP ID

  // const STREAM_API_KEY = 'qkswp9afyz49';
  // const STREAM_APP_ID = '1147074';

  // Custom header for our Global feed posts
  const renderHeader = (props) => {
    const { activity } = props;
    const { actor } = activity;
    // console.log('actor');
    // console.log(actor.data);
    return (
      <View style={{ marginLeft: 10 }}>
        <UserBar username={actor.data.name} avatar={actor.data.profileImage} />
      </View>
    );
  };

  // Each post/activity will contain the custom header and a like button
  const renderActivity = (props) => {
    // console.log(props)
    return (
      <Activity
        Header={renderHeader(props)}
        {...props}
        Footer={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <LikeButton reactionKind="heart" {...props} />

            <ReactionIcon
              icon="comment here"
              labelSingle="comment"
              labelPlural="comments"
              counts={props.activity.reaction_counts}
              kind="comment"
            />
          </View>
        }
      />
    );
  };

  // While our applications brings the secret user token, we will render a spinner
  return loading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      {/* <Text style={styles.title}>Global Feed</Text> */}
      <StreamApp
        apiKey={STREAM_API_KEY}
        appId={STREAM_APP_ID}
        token={globalToken}
      >
        <FlatFeed feedGroup="timeline" Activity={renderActivity} notify />
        {/* <StatusUpdateForm feedGroup={'user'}/> */}
      </StreamApp>
      <StreamApp
        apiKey={STREAM_API_KEY}
        appId={STREAM_APP_ID}
        token={userToken}
      >
        <StatusUpdateForm feedGroup={'user'} />
      </StreamApp>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    height: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
  },
});

export default ActivityFeed;
