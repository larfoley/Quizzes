import styled from 'styled-components'

const Box = styled.div`
  display: ${props => props.display? props.display : "block"};
  background-color: white;
  padding: 2em;
  margin-top: 2em;
  margin-bottom: 2em;
  border-radius: 5px;
  box-shadow: 0 1px 1px 0 rgba(10, 16, 34, .2);
  max-width: ${props => props.maxWidth};
  margin-left: auto;
  margin-right: auto;
`

export default Box
