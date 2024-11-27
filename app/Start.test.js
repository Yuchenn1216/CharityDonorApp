import React from 'react';
import renderer from 'react-test-renderer';
import AppError from './components/AppError';
import AppCategory from './components/AppCategory';

test("AppError contains text", () => {
    const json = renderer.create(<AppError>This is an error</AppError>).toJSON(); 
    const error = json.children[0]
  
     expect(error.props.style.fontSize).toBe(15);
     expect(error.props.style.color).toBe("red");
     expect(error.props.style.fontFamily).toBe("Avenir-Roman"); 
     expect(error.children[1]).toBe("This is an error");
  });

  test("AppCategory contains category and iconImage", () => {
    const imageSource = require('./assets/environment.png');
    const label = "Environment";
    const json = renderer.create(<AppCategory image={imageSource} label={label}/>).toJSON(); 
    expect(json.children.length).toBe(2); //there are two children in AppCategory, image and label

    //check the first child Image
    const image = json.children[0]; 
    expect(image.type).toBe("Image");
    expect(image.props.source.testUri.includes("./assets/environment.png"));
    expect(image.props.style.height).toBe(25);
    expect(image.props.style.width).toBe(25);

    //check the second child Label
    const Label = json.children[1];
    expect(Label.type).toBe("Text");
    expect(Label.children[0]).toBe("Environment");
  });