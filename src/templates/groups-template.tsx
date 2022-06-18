import React from "react";
import { GroupsPageData } from "../queries/groups";
import { Header } from "../layouts/Header";
import { layout, LayoutType } from "../utils/urls";
import { Main } from "../layouts/Main";
import { Card } from "../components/Card";
import { Pagination } from "../components/Pagination";
import { Footer } from "../layouts/Footer";
import { Meta } from "../components/Meta";

export type GroupsPageProps = {
  data: GroupsPageData;
  id: string | number;
  type: string;
  layout: LayoutType | string;
  current: number;
  size: number;
  total: number;
};

const GroupsTemplate: React.FC<GroupsPageProps> = (props) => {
  return (
    <>
      {/*prettier-ignore*/}
      <Header
        title={props.current === 1
          ? `${props.type}：${props.id} | {title}`
          : `${props.type}：${props.id} - 第 ${props.current} 页 | {title}`
        }
        url={props.current === 1
          ? `{url}${layout(props.layout, props.id)}`
          : `{url}${layout(props.layout, props.id, "page", props.current)}`
        }
      />
      <Main>
        {/*prettier-ignore*/}
        <Meta
          name={props.current === 1
            ? `${props.type}：${props.id}`
            : `${props.type}：${props.id} - 第 ${props.current} 页`
          }
          description={`共 ${props.total} 篇文章`}
        />
        <section>
          {props.data.map((item) => (
            <Card
              key={`group-${item.link}`}
              title={item.title}
              link={item.link}
              date={item.date}
              excerpt={item.excerpt}
              thumbnail={item.thumbnail}
              categories={item.categories}
              tags={item.tags}
            />
          ))}
        </section>
        <Pagination
          current={props.current}
          size={props.size}
          onLink={(page) => {
            return layout(props.layout, props.id, "page", page);
          }}
        />
      </Main>
      <Footer />
    </>
  );
};

export default GroupsTemplate;
