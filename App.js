/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Section from './components/Section';
import Task from './components/Task';

import {tasks} from './constants/tasks';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState(tasks);

  const handleCreateTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, {title: task}]);
    setTask(null);
  };

  const completeTask = index => {
    let _taskItems = [...taskItems];
    _taskItems.splice(index, 1);
    setTaskItems(_taskItems);
  };

  const backgroundColor = '#E8EAED';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : backgroundColor,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : backgroundColor,
          }}>
          <Section title="Today's List">
            {/* This is the place to display all the tasks */}
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => completeTask(index)}>
                  <Task text={item.title} key={index} />
                </TouchableOpacity>
              );
            })}
          </Section>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskwrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleCreateTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  writeTaskwrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    borderColor: 'transparent',
    borderRadius: 60,
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'rgba(0,0,0,0.03)',
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  addText: {
    fontWeight: '600',
  },
});

export default App;
