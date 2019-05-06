const GistInput = styled.input`
  font-size: 1rem;
  border: 1px solid black;
  margin-right: 2px;
  padding: 5px;
`;

const GistButton = styled.button`
  font-size: 1rem;
  border: 1px solid red;
  padding: 5px;
`;

export const GistGetter: React.SFC<Props> = ({
  gistId,
  
})


<GistInput

  type="text"
  value={this.state.gistId}
  onChange={ev => this.setState({ gist: ev.target.value })}
  placehold="A gist..."
/>
<GistButton onClick={() => this.updateGistList(this.state.gistId)}>
  Get Gist
</GistButton>