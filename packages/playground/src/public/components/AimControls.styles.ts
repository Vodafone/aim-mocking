import styled, { css } from 'styled-components'

export const Container = styled.div(
  () => css`
    margin-top: 20px;
    background: #e7e7e7;
    border: 1px solid #cacaca;
    padding: 10px 20px;
  `,
)

export const Header = styled.div(
  () => css`
    font-size: 24px;
    color: #5a5a5a;
    text-align: left;
    font-weight: 800;
    margin-bottom: 20px;
  `,
)

export const Button = styled.button(
  () => css`
    font-size: 1.5em;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #b3b3b3;
    font-size: 18px;
    padding: 15px;
    box-shadow: 2px 3px 5px #959595;
    margin-bottom: 20px;
  `,
)
