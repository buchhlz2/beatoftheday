import React from "react";
import styled from "styled-components";
import $ from "jquery";
import _ from "lodash";
import { Link } from "react-router-dom";

const Upload = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 20px;
  display: flex;
  align-items: start;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 1080px;
  background: #f7f7f7;

  input {
    padding-left: 0;
    margin-left: 0;
  }
`;

const Heading = styled.h3`
  margin-bottom: 30px;
`

const FormItem = styled.div`
  display: flex;
  label {
    width: 50px;
  }
`

class AddATrack extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedFile: false, doneUploading: false };
  }

  componentWillUnmount() {
    this.setState({doneUploading: false});
  }

  fileChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  onClickUpload = () => {
    this.setState({uploading: true});
    this.upload(this.state.selectedFile);
  }

  upload = (blob) => {
    this.setState({ uploading: true });

    const requestObj = {
      method: 'GET',
      url: '/tracks/s3_direct_post',
    };

    $.ajax(requestObj).then(data => {
      console.log(data);
      let fd = new FormData();
      _.each(data.fields, (value, key) => {
        fd.append(key, value);
      });

      fd.append("file", blob);

      const requestObj2 = {
        method: 'POST',
        url: data.url,
        data: fd,
        processData: false,
        contentType: false
      };

      $.ajax(requestObj2).then(data2 => {
        console.log(data2);
        const data2$ = $(data2);
        const location = data2$.find('PostResponse').find('Location').text()

        const requestObj3 = {
          method: 'POST',
          url: '/tracks/s3_blob_location',
          data: {
            location: location,
            name: $('#name').val(),
          }
        };

        $.ajax(requestObj3).then(data3 => {
          this.setState({
            doneUploading: true,
            uploading: false
          });
        });
      });
    });
  }

  render() {
    return (
      <Wrapper>
        {this.state.doneUploading ? (
          <React.Fragment>
            <Heading>
              Congrats!
              <br />
              <br />
              <br />
              <Link to="/">Go back to the homepage to view your upload.</Link>
            </Heading>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Heading>Choose an mp3 or m4a file to upload:</Heading>
            <input
              type="file"
              onChange={this.fileChangeHandler}
              accept="audio/mp3,audio/m4a"
            />
            <FormItem>
              <label htmlFor="name">Name:</label>
              <input id="name" type="text" />
            </FormItem>
            {this.state.uploading ? (
              <Upload>Uploading...</Upload>
            ) : (
              <Upload onClick={this.onClickUpload}>Upload!</Upload>
            )}
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

export default AddATrack;
