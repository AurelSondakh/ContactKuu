import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Containers
import HomePage from '../Containers/HomePage';
import AddContactPage from '../Containers/AddContactPage';
import ContactDetailPage from '../Containers/ContactDetailPage';
import EditContactPage from '../Containers/EditContactPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="AddContactPage" component={AddContactPage} options={{ headerShown: false }} />
        <Stack.Screen name="ContactDetailPage" component={ContactDetailPage} options={{ headerShown: false }} />
        <Stack.Screen name="EditContactPage" component={EditContactPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;