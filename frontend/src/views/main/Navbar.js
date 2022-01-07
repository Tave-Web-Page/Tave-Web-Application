import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav=styled.nav`
position : relative;
top 20px;
`

const SubMenu = styled.div`
    display: none;
`;


const UnList=styled.ul`
display:flex;
flex-direction: row;
justify-content: space-around;
`


const List=styled.li`
display:flex;
flex-direction: column;
margin:20px;
&:hover ${SubMenu} {
    display:flex;
    flex-direction: column;
}
`

const MenuLink = styled(Link)`
    color: black;
    text-decoration: none;
    transition: 850ms;
    font-weight: bold;
    font-size: 20px;
    font-family: '"' Noto Sans KR ', sans-serif"';
    &:hover {
        color: white;
        background-color: navy;
        border: 1px solid navy;
        border-radius: 4px;
    }
`;

const SubMenuLinks = styled(Link)`
    text-decoration: none;
    font-size: 15px;
    font-family: '"' Noto Sans KR ', sans-serif"';
    color: black;
    &:hover {
        color: navy;
        border: 1px solid navy;
        border-radius: 4px;
    }
`;


function Navbar() {
    return (
        <Nav>
            <UnList>
                <List>
                    <MenuLink to="/" class="menuLink">
                        Home
                    </MenuLink>
                </List>

                <List class="menuhover">
                    <MenuLink to="/about" class="menuLink">
                        TAVE
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/about">TAVE 소개</SubMenuLinks>
                        <SubMenuLinks to="/about/history">연혁</SubMenuLinks>
                        <SubMenuLinks to="/about/manager">
                            운영진 소개
                        </SubMenuLinks>
                        <a href="https://www.youtube.com/channel/UCLEXVED0YBiMCl7tFCSD7cQ">
                            YouTube
                        </a>
                    </SubMenu>
                </List>

                <List class="menuhover">
                    <MenuLink to="/notice" class="menuLink">
                        Notice
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/notice">공지사항</SubMenuLinks>
                        <SubMenuLinks to="/news">Tavy News</SubMenuLinks>
                    </SubMenu>
                </List>

                <List class="menuhover">
                    <MenuLink to="/board" class="menuLink">
                        TAVY
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/board">활동 후기</SubMenuLinks>
                        <SubMenuLinks to="/photo">활동 사진</SubMenuLinks>
                    </SubMenu>
                </List>

                <List class="menuhover">
                    <MenuLink to="/qna" class="menuLink">
                        Q&A
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/faq">FAQ</SubMenuLinks>
                        <SubMenuLinks to="/qna">Q&A</SubMenuLinks>
                    </SubMenu>
                </List>

                <List class="menuhover">
                    <MenuLink to="/apply" class="menuLink">
                        Recruit
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/apply">지원하기</SubMenuLinks>
                        <SubMenuLinks to="/apply/check">지원 확인</SubMenuLinks>
                        <SubMenuLinks to="/apply/result">
                            합격 확인
                        </SubMenuLinks>
                    </SubMenu>
                </List>
            </UnList>

            <br />
            <br />
        </Nav>
    );
}

export default Navbar;