---
title: 从零实现一个 Java 微框架 - IoC
slug: implement-a-java-microframework-from-zero-2
status: publish
date: 2021-04-11T00:00:00.000Z
date_updated: 2021-07-28T06:30:37.253Z
layout: post
categories:
  - 折腾记录
tags:
  - Java
  - XK-Java
  - 框架
---

## 前言

IoC 容器在之前的文章中就有说明。

<Post link={"/post/talking-about-di-and-ioc"} />

之前的文章其实是基于 PHP 的，虽然思想是类似的，不过还是再次说明一下吧。

## IoC 是什么？

**IoC（Inversion of control，控制反转）**，它是一种**思想**而不是一个**技术实现（组件**），通常也和 **DI（Dependency Injection，依赖注入）**一同出现，这两者其实可以看成一个东西。不过 DI 更多的是指**注入的过程或方式**（B 对象注入到了 A），IoC 更多的是指这种**反转思想**（B 对象交给了外部管理）。

为了更好的描述 IoC，这里我们就引入一个样例吧，就拿我前几天购买的一个阅读器来说吧。既然是阅读器，那么我们肯定是要有个阅读器的类：

```java
public class BookReader {

    private final BookStorage storage;

    public BookReader() {
        this.storage = new FileBookStorage();
    }

    public String read(final String name) {
        return this.storage.getBook(name).getContent();
    }

    public void put(final Book book) {
        this.storage.registerBook(book);
    }
}
```

其中，我们需要一个 `BookStorage` 来存储阅读器里存放的书，然后阅读器拥有 `read` 阅读和 `put` 存新书的功能。

通常情况下我们会将所依赖的 `BookStorage` 的对象直接在构造器中 `new` 出来，这是最简单且直接的使用方式。但是这种简单的方式也导致了一种问题，如果哪天需要开发一个基于网络的阅读器，那么我们的存储不再是 `FileBookStorage`，而应该是 `NetworkBookStorage`，此时为了能制作出网络阅读器我们就不得不重新写一个 `BookReader` 类，然后重新实现内部的逻辑。

这时候肯定有人会提出应该把 `BookStorage` 从外面通过构造器传入不就可以了？其实当你提出这个疑问的时候你已经可以说了解 IoC 了，这种通过**外部传入依赖**的方式就称为**依赖注入**，也就是**控制反转的思想**。

控制反转中的**控制**指的是对对象管理、创建的权力；**反转**指的是将这个控制权交给外部环境，至于外部环境可以是几行代码、IoC 容器。使用者只负责使用依赖，至于依赖是如何构造、管理的这就不关使用者的事了。

利用 IoC 思想改造后的构造器如下：

```java
public BookReader(final BookStorage bookStorage) {
    this.storage = bookStorage;
}
```

改造后虽然我们丢失了创建 `BookStorage` 的功能，不过相对的这种方式解决了各部件间强耦合的问题，我们可以通过给 `BookReader` 传入不同的 `BookStorage` 来灵活的实现及复用。

## IoC 容器

**IoC 容器（IoC Container）**一般也称为 **IoC 服务提供者（IoC Service Provider）**，简单的说就是用来自动化创建依赖以及管理依赖的工厂。由于经常被简称为 IoC 所以也很多人会认为 IoC 就是 IoC 容器，其实 IoC 容器只是用来方便实现 IoC 思想的一种工具。

最简单的 IoC 容器包括了以下几种功能：

- **对象的构建管理**：当我们需要某个对象的时候无需关心它是如何被创建出来的、需要什么依赖关系，这个过程就是由 IoC 负责的。
- **对象的依赖绑定**：为了对对象进行构建，IoC 容器需要知道对象的依赖关系。
- **对象的存储管理**：既然是容器那就需要有存储的功能，IoC 容器可以依照需求存储单例对象或依赖（需要存储的依赖不单单是 Bean 对象）。

对于现在的 IoC 容器来说注册对象管理信息一般有以下 3 种：

- **直接编码**：即调用注册方法 `regsiter` 将对象注册到 IoC 容器中。
- **配置文件**：在 Spring IoC 等容器一般都存在这种配置方式，通过配置文件配置 IoC 容器的对象及依赖关系。
- **元数据**：元数据的方式则较为广泛，注解、类型、变量名等等都可以作为元数据来指引 IoC 容器注册和使用对象。

通常情况 IoC 容器有以下几种注入方式：

- **构造器注入**
- **Setter 方式注入**
- **字段注入**：字段注入可以归入 Setter 注入，有一定侵入性，是利用反射直接设置字段值的方式。
- **接口注入**：接口注入是比较特殊的，带有侵入性，不一定所有 IoC 容器都支持，是通过实现接口方法来取得注入的依赖。

## 设计 IoC 容器

既然已经知道了 IoC 容器需要的功能，那么就可以开始设计我们自己的 IoC 容器了。文章可能会结合一些 Spring 的东西。不过本篇文章主要是写我自己的 Java 框架，所以 Spring 就点到为止了，如需深入的话可以看别的源码解析的文章或者书籍。比如这篇大佬写的[文章](http://www.tianxiaobo.com/2018/05/30/Spring-IOC-%E5%AE%B9%E5%99%A8%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0%E5%AF%BC%E8%AF%BB/)就还不错。

XK-Java IoC 容器的设计较为简单，其设计最初的参考是来自 [Laravel](https://laravel.com/)，不过经过后续不断的重构已经比较类似 Spring IoC 了。

XK-Java IoC 容器所需要存储的数据：

- **实例元信息（Binding, BeanDefinition）**：保存实例的一些信息，如作用域、名称、注解等一系列容器需要使用的信息。
- **实例（Instance, Singleton）**：由于有些实例是以单例的状态存储的，所以容器还需要为这些实例提供存储。
- **别名（Alias）**：实例可以有别的名称。
- **类型索引（BeanNameByType）**：通常情况下我们都不会对每个 Bean 都进行配置，所以 IoC 容器一般是使用类型来进行自动注入的，为了能快速的查询到指定类型的依赖，我们需要对每个绑定到 IoC 容器的依赖都进行类型遍历，然后建立索引。
- **注入器 & Bean 处理器（Injector & BeanProcessor）**：为了方便扩展和实现额外的功能就不能把构建的流程封闭到 IoC 容器，所以需要通过注入器或者 Bean 处理器来处理实例或依赖。
- **作用域（Context, Scope）**：IoC 容器不可能只存储某个作用域的实例，通常有多种作用域，比如单例域、非单例、请求域等多种作用域来存储实例。
- **临时依赖（DataBinder）**：由于部分情况需要临时注入一些依赖，比如 HTTP 的请求参数，这就需要有一个数据容器来临时存储这些参数依赖。

XK-Java IoC 容器所需要的功能：

- **绑定**：用于将依赖绑定到容器中，依赖可以是已经构建完成的实例、立即值、工厂类等等。对应 `bind`、`doBind` 方法。
- **构建**：当某个依赖被依赖的时候，而且依赖没有构建的时候就需要对依赖进行构建。对应 `doBuild` 方法。
- **获取**：当我们需要某个实例的时候，就需要从 IoC 容器获取。对应 `make`、`doMake` 方法。
- **销毁**：当依赖被从容器删除，或者容器关闭的时候就需要对依赖进行销毁操作，如关闭连接池等等的操作。对应 `remove`、`doRemove` 方法。

## 实现

有了大致的设计我们就可以开始动工了。

首先需要准备一些周边的类和接口，以下这些周边类是属于 IoC 的一部分，有些其他的类，如 [MergedAnnotation](/post/talking-about-merged-annotation)，就不在这里说明了。

- [TypeProvider](https://github.com/syfxlin/xkjava/blob/ce06902e7b8b6650791c41aa0ce13c291b311969/xkjava-framework/src/main/java/me/ixk/framework/ioc/type/TypeProvider.java)：为实现集合、Map 等复合类型注入的类型提供器。因为 Java 有泛型擦除的问题，无法简单的保留泛型，需要从 `Field` 等类中读取然后保存传递到容器中。
- [TypeWrapper](https://github.com/syfxlin/xkjava/blob/ce06902e7b8b6650791c41aa0ce13c291b311969/xkjava-framework/src/main/java/me/ixk/framework/ioc/type/TypeWrapper.java)：`TypeProvider` 的实现类。
- [FactoryBean](https://github.com/syfxlin/xkjava/blob/ce06902e7b8b6650791c41aa0ce13c291b311969/xkjava-framework/src/main/java/me/ixk/framework/ioc/factory/FactoryBean.java)：工厂 Bean，作用和 Spring 的类似，用于创建 Bean 的工厂。
- [ObjectFactory](https://github.com/syfxlin/xkjava/blob/ce06902e7b8b6650791c41aa0ce13c291b311969/xkjava-framework/src/main/java/me/ixk/framework/ioc/factory/ObjectFactory.java)：作用和 Spring 类似，用于延迟获取 Bean，不过在本框架也用于 Cglib 代理。
- [ObjectProvider](https://github.com/syfxlin/xkjava/blob/ce06902e7b8b6650791c41aa0ce13c291b311969/xkjava-framework/src/main/java/me/ixk/framework/ioc/factory/ObjectProvider.java)：作用和 Spring 类似，相当于高级的 `ObjectFactory`。
- [AnnotatedEntry](https://github.com/syfxlin/xkjava/blob/ce06902e7b8b6650791c41aa0ce13c291b311969/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/AnnotatedEntry.java)、[ClassProperty](https://github.com/syfxlin/xkjava/blob/ce06902e7b8b6650791c41aa0ce13c291b311969/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/ClassProperty.java)、[ConstructorContext](https://github.com/syfxlin/xkjava/blob/ce06902e7b8b6650791c41aa0ce13c291b311969/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/ConstructorContext.java)、[InjectContext](https://github.com/syfxlin/xkjava/blob/ce06902e7b8b6650791c41aa0ce13c291b311969/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/InjectContext.java)、[ParameterContext](https://github.com/syfxlin/xkjava/blob/ce06902e7b8b6650791c41aa0ce13c291b311969/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/ParameterContext.java)：一些包装类。
- [ScopeType](https://github.com/syfxlin/xkjava/blob/ce06902e7b8b6650791c41aa0ce13c291b311969/xkjava-framework/src/main/java/me/ixk/framework/ioc/context/ScopeType.java)：就一个静态类，存放内置作用域名称的常量。

有了上面这些周边类，就可以进入下一部分了。

### DataBinder

由于 XK-Java 的设计与 Spring 有所不同。在 XK-Java 的设计里，所有需要注入的（如注入单例，注入请求参数） Java 实例都应该由 IoC 容器负责构建。通常情况下我们有可能会临时设置一些依赖，而又不希望这些临时的依赖托管到容器里，这时候就需要 `DataBinder` 来负责存储。

```java
// see: https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/binder/DataBinder.java
public interface DataBinder {
    /**
     * 获取实例
     *
     * @param name       实例名
     * @param type       实例类型
     * @param annotation 注解
     * @param <T>        实例类型
     * @param container  容器
     * @return 实例
     */
    <T> T getObject(
        String name,
        TypeWrapper<T> type,
        MergedAnnotation annotation,
        Container container
    );
}

```

`DataBinder` 被设计为简单的依赖存储容器，所以无需非常多的元信息，通过实例的名称、类型、注解即可取得其存储的实例。可以认为是缩小版的 IoC 容器。

`DefaultDataBinder` 是默认的实现类：

```java
// see: https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/binder/DefaultDataBinder.java
public class DefaultDataBinder implements DataBinder {
    // 实例容器 <名称，实例>
    private final Map<String, Object> objects = new HashMap<>();
    // 类型对应的实例名称 <类型，<名称>>
    private final Map<Class<?>, List<String>> objectTypes = new HashMap<>();

    @Override
    public <T> T getObject(
        String name,
        final TypeWrapper<T> type,
        final MergedAnnotation annotation,
        final Container container
    ) {
        // 取得 @DataBind 注解，@DataBind 注解可以控制注入的实例
        final DataBind dataBind = annotation == null
            ? null
            : annotation.getAnnotation(DataBind.class);
        if (dataBind != null && dataBind.name().length() != 0) {
            // 如果 DataBind 设置要取得的实例的名称就以 DataBind 为准
            name = dataBind.name();
        }
        final Class<T> clazz = type.getClazz();
        // 取得对应名称的实例
        Object object = this.objects.get(name);
        // 如果取得的实例类型不符，那就放弃这个实例（需要注意，DataBind 被设计为不允许类型转换）
        if (object != null && !clazz.isInstance(object)) {
            object = null;
        }
        if (object == null) {
            // 如果通过名称找不到就尝试通过类型查找
            final List<String> list = this.objectTypes.get(clazz);
            final String objectName;
            if (list == null || list.isEmpty()) {
                // 如果没找到就使用默认的名称，即类名首字母小写后的名称
                objectName = container.typeToBeanName(clazz);
            } else {
                objectName = list.get(0);
            }
            object = this.objects.get(objectName);
        }
        if (object == null) {
            // 如果还是没取得，就尝试使用 IoC 容器构建（递归构建）
            object = container.make(name, type, this);
        }
        if (
            object == null &&
            dataBind != null &&
            DataBind.EMPTY.equals(dataBind.defaultValue())
        ) {
            // 构建还是失败了（真惨），那就使用 DataBind 设置的默认值
            object = dataBind.defaultValue();
        }
        // 类型转换（需要注意，这只是简单的转换）
        return Convert.convert(clazz, object);
    }
}
```

### Context

`Context` 类似于 Spring 的 `Scope`，用于作用域隔离，比如线程私有实例，请求私有实例等等。具体的可以参考 Spring 的 `Scope` 的作用。

```java
// see: https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/context/Context.java
public interface Context {
    /**
     * 是否是共享的，即单例
     *
     * @return 是否
     */
    default boolean isShared() {
        return true;
    }

    /**
     * 该 Context 是否启动，一般的 Context 只要 new 后就会启动 但是如果是 ThreadLocal 则需要另行启动
     *
     * @return 是否启动
     */
    default boolean isCreated() {
        return true;
    }

    /**
     * 是否需要代理
     *
     * @return 是否需要代理
     */
    default boolean useProxy() {
        return false;
    }

    /**
     * 获取所有实例
     *
     * @return 所有实例
     */
    ConcurrentMap<String, Object> getInstances();

    /**
     * 获取实例
     *
     * @param name 实例名称
     * @return 实例
     */
    default Object get(final String name) {
        return this.getInstances().get(name);
    }

    /**
     * 删除实例
     *
     * @param name 实例名称
     */
    default void remove(final String name) {
        this.getInstances().remove(name);
    }

    /**
     * 设置实例
     *
     * @param name     名称
     * @param instance 实例
     */
    default void set(final String name, final Object instance) {
        this.getInstances().put(name, instance);
    }

    /**
     * 是否存在实例
     *
     * @param name 实例名称
     * @return 是否存在
     */
    default boolean has(final String name) {
        return this.getInstances().containsKey(name);
    }
}
```

可以看到 `Context` 其实就是一个类似 `Map` 的容器，只不过有些其他的方法：

- `isShared` 方法用于确定是否是单例，如果是单例 IoC 容器会在构建实例完后将单例存入 `Context`。
- `isCreated` 方法用于确定实例是否启动，避免在未启动的时候错误使用。
- `useProxy` 方法用于确定实例是否需要 Cglib 代理来实时获取最新的值，避免发生使用旧对象情况，或者将 Request 作用域对象注入到 Singleton 作用域导致线程不安全。
  有了接口自然有实现类，以下是几个不同场景的实现类，这几个实现类由于代码简单就不细说了：
- [SingletonContext](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/context/SingletonContext.java)：单例作用域，里面就是一个简单的 `ConcurrentHashMap`。
- [PrototypeContext](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/context/PrototypeContext.java)：原型作用域，不存储实例，是非共享的。
- [RequestContext](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/context/RequestContext.java)：请求作用域，这个作用域和 [SessionContext](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/context/SessionContext.java) 一样比较特殊，是存储于对应作用域的对象里，比如 Request 是存储于 `HttpServletRequest` 的 Attribute 里，Session 则存储于 `HttpSession` 里。

### Binding

`Binding` 是实例元信息的实现类，与 Spring 中的 `BeanDefinition` 类似，不过由于不需要太多的功能就只保存了几种元信息：

- 作用域名称（[scope](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java#L34)）：实例对应的作用域名称。
- 名称（[name](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java#L35)）：实例名称，全局唯一。
- 类型及类注解（[instanceTypeEntry](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java#L36)）：实例的类型及标记在该类上的组合注解。
- 是否是主要的实例（[primary](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java#L37)）：如果是主要注解，当通过类型获取实例，同时该类型下有多个不同的实例，则优先使用 `primary` 为 `true` 的实例。
- 额外信息（[bindingInfos](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java#L38)）：带软引用缓存的一些信息，有 [init-destory](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java#L219-L220) 对应的方法反射和 [autowired](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java#L221) 需要注入的方法，以及字段和方法的[反射以及注解](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java#L223-L224)。同类型并且有缓存的情况下就不需要再扫描。

除了元信息外 `Binding` 还保存了一些其他的数据：

- [Context](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java#L33)：作用域，为了 `Binding` 内部方法方便操作，避免要使用的时候从 IoC 容器中获取。
- [FactoryBean](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java#L40)：创建实例的工厂方法，如果未设置 IoC 容器会默认使用 [doBuild](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/Container.java#L799-L812) 方法构建实例。
- [Mutex](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java#L44)：`Binding` 的互斥量（锁）用于避免多次初始化单例使用。将互斥量分散到不同的 `Binding` 中，避免使用唯一互斥量导致大量阻塞的发生。同时单例也采用双重检查模式，避免每次获取的时候都锁住互斥量导致阻塞。

数据部分说完了就开始看方法吧，首先是初始化，初始化就是对 `Binding` 内的字段进行赋值，扫描对应类型的方法、注解等等的信息，对于消耗性能的扫描部分则使用软引用，空间换时间，避免重复扫描，同时在内存不足的时候可以时间换空间，一定程度避免 OOM 发生。

然后 `Binding` 里剩下的重要操作就是对实例的操作了：

```java
// see: https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/entity/Binding.java
public class Binding {
    public Object getSource() {
        // 双重检查获取，因为此时实例可能在构建
        final Object source = this.getSourceUnsafe();
        if (source == null) {
            synchronized (this.getMutex()) {
                return this.getSourceUnsafe();
            }
        }
        return source;
    }

    public Object getSource(final boolean proxy) {
        // 是否使用代理，如果使用代理则利用 Cglib 进行代理，避免引用旧实例，否则就直接取得未代理的实例
        // 因为执行方法的时候，实际上是每次都使用 getSource 方法取出最新的实例，然后执行
        // 代理需要满足所有条件才会生效：
        //   1. 是单例
        //   2. Context 的作用域配置了需要代理
        //   3. 注入的类型需要代理，在 TypeWrapper 配置（典型的就是 Field）
        if (proxy && this.useProxy() && this.isShared()) {
            return ReflectUtils.proxyObjectFactory(
                (ObjectFactory<Object>) this::getSource,
                this.getType()
            );
        } else {
            return this.getSource();
        }
    }

    private Object getSourceUnsafe() {
        // 获取实例前需要判断 Context 是否已经启动，如果未启动就直接返回 null，避免 NPE。
        return this.isCreated() ? this.context.get(name) : null;
    }

    public void setSource(final Object instance) {
        // 设置实例的时候锁住互斥量
        synchronized (this.getMutex()) {
            // 要确定是单例才可以存入 Context，否则就不能存入
            if (this.context.isShared()) {
                this.context.set(name, instance);
            }
        }
    }
}

```

### Injector

与 Spring 不同的是，XK-Java 为了更好的扩展性添加了**注入器（Injector）**的设计，其作用仅作为对实例或参数进行注入。目前共有两种类型的 `Injector`：

- [ParameterInjector](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/injector/ParameterInjector.java)：用于参数注入的注入器。
- [InstanceInjector](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/injector/InstanceInjector.java)：用于实例注入的注入器。

添加注入器的方式非常简单，只需要给注入器的类添加 `@Injector` 注解，注解扫描器会自动识别注入器并添加到 IoC 容器中。同时可以使用 `@Order` 注解来对注入器进行排序。

`DefaultParameterInjector` 是默认的参数注入器，其负责通过参数的元信息构建或获取参数，然后让 IoC 容器可以构建实例或者调用方法：

注入规则：

- 标记了 `@DataBind` 方法。利用 `@DataBind` 的一些限制查找依赖注入。
- 标记了 `@Value` 方法。使用 `@Value` 的表达式进行查找注入。
- 未标记任何注解。使用 `DataBinder` 进行注入。

```java
// see: https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/injector/DefaultParameterInjector.java
public class DefaultParameterInjector implements ParameterInjector {
    @Override
    public Object[] inject(
        Container container,
        Object[] dependencies,
        ParameterContext context
    ) {
        // 通过 Parameter 的上下文取得参数反射对象、名称、注解等信息
        final ParameterEntry[] entries = context.getParameterEntries();
        for (int i = 0; i < entries.length; i++) {
            // ParameterEntry 中有个 changed 的标记用于标记是否已经设置
            // 如果已经设置则不需要使用 DefaultParameterInjector 再次设置
            // 当然这个标记要靠 ParameterInjector 是否遵守
            if (entries[i].isChanged()) {
                continue;
            }
            Parameter parameter = entries[i].getElement();
            String parameterName = entries[i].getName();
            MergedAnnotation annotation = entries[i].getAnnotation();
            // 获取 @DataBind 注解，由于 DefaultParameterInjector 并不只用于构造器，所以这个注解还是需要的
            DataBind dataBind = annotation.getAnnotation(DataBind.class);
            // 获取 @Value 注解
            final Value value = annotation.getAnnotation(Value.class);
            if (value != null) {
                // 如果设置了 @Value 注解则优先使用 @Value 注解
                final InjectContext injectContext = context.getContext();
                // 利用 SpEL 解析 @Value 里的表达式，具体看源码，就是委托给 BeanExpressionResolver 解析
                dependencies[i] =
                    this.resolveExpression(
                            value,
                            injectContext.getType(),
                            // 获取从 PropertiesProcessor 里设置的 properties 和 prefix
                            // PropertiesProcessor 是 BeforeInjectProcessor，会在 Injector 之前执行
                            injectContext.getData(
                                PropertiesProcessor.PROPERTIES
                            ),
                            injectContext.getData(
                                PropertiesProcessor.PROPERTIES_PREFIX
                            ),
                            container
                        );
            } else {
                // 否则就使用当前的 DataBinder 来取得依赖
                // 默认是 DefaultDataBinder
                dependencies[i] =
                    context
                        .getBinder()
                        .getObject(
                            parameterName,
                            // 将 Parameter 封装起来是为了传递泛型信息
                            TypeWrapper.forParameter(parameter),
                            annotation,
                            container
                        );
            }
            if (
                dependencies[i] == null &&
                dataBind != null &&
                dataBind.required()
            ) {
                // 如果这个参数是必须要注入的，但是未查找到依赖则抛出 NPE
                final NullPointerException exception = new NullPointerException(
                    "Target [" +
                    context.getExecutable().getDeclaringClass().getName() +
                    "@" +
                    context.getExecutable().getName() +
                    "(" +
                    parameterName +
                    ")] is required, but inject value is null"
                );
                log.error(
                    "Target [{}@{}({})] is required, but inject value is null",
                    context.getExecutable().getDeclaringClass().getName(),
                    context.getExecutable().getName(),
                    parameterName
                );
                throw exception;
            }
            // 不管有没有注入完成都设置 changed 标记，表示已经处理过了
            // DefaultParameterInjector 是优先级最低的注入器，所以设不设置都一样，不过还是遵守标准吧
            entries[i].setChanged(true);
        }
        return dependencies;
    }
}
```

`DefaultPropertyInjector` 是默认的字段（成员）注入器，与 `PropertiesValueInjector` 一同作用，用于对实例字段进行注入：

注入规则：

- 字段存在 Setter 方法。使用 Setter 方法注入。
- 字段标记了 `@Autowired` 注解，但是没有 Setter 方法。直接反射设置。
- 字段标记了 `@Autowired` 注解，同时有 Setter 方法。使用 Setter 方法注入。

```java
public class DefaultPropertyInjector implements InstanceInjector {
    @Override
    public Object inject(
        Container container,
        Object instance,
        InjectContext context
    ) {
        // 获取所有字段
        for (ChangeableEntry<Field> entry : context.getFieldEntries()) {
            // 如果已经修改过就跳过
            if (entry.isChanged()) {
                continue;
            }
            final Field field = entry.getElement();
            final MergedAnnotation annotation = entry.getAnnotation();
            // 获取 @Autowired 注解
            Autowired autowired = annotation.getAnnotation(Autowired.class);
            // 获取字段的描述信息，主要是用于获取 WriteMethod 也就是 Setter
            PropertyDescriptor propertyDescriptor = BeanUtil.getPropertyDescriptor(
                context.getType(),
                field.getName()
            );
            // 看看有没有 Setter 方法
            Method writeMethod = propertyDescriptor == null
                ? null
                : propertyDescriptor.getWriteMethod();
            if (autowired == null) {
                // 没有 @Autowired 同时也没有 Setter 方法那还注入个鬼，直接跳过
                if (writeMethod == null) {
                    continue;
                }
                // 利用 DataBinder 获取依赖
                Object dependency = context
                    .getBinder()
                    .getObject(
                        field.getName(),
                        TypeWrapper.forField(field),
                        annotation,
                        container
                    );
                // 如果获取不到则看看字段是不是设置了值，如果设置了则取出
                if (dependency == null) {
                    dependency = ReflectUtil.getFieldValue(instance, field);
                }
                // 将值通过 Setter 方法注入
                ReflectUtil.invoke(instance, writeMethod, dependency);
            } else {
                // 有 @Autowired 注解
                Object dependency;
                String name = autowired.name();
                Class<?> type = autowired.type();
                if (!"".equals(name)) {
                    // @Autowired 注解设置了要注入的依赖名称，则直接使用这个名称的实例注入
                    dependency = container.make(name, field.getType());
                } else {
                    TypeWrapper<?> typeWrapper;
                    // 取得要注入的依赖类型，如果 @Autowired 里没设置则默认使用字段的类型
                    // 同时也查看 @Autowired 的 proxyType，如果为 UNSET 则遵循 useProxy 设置
                    // 否则就按照 @Autowired 的设置
                    if (type == Class.class) {
                        typeWrapper =
                            TypeWrapper.forField(field, autowired.proxyType());
                    } else {
                        typeWrapper =
                            TypeWrapper.forClass(type, autowired.proxyType());
                    }
                    // 利用 DataBinder 获取依赖
                    dependency =
                        context
                            .getBinder()
                            .getObject(
                                field.getName(),
                                typeWrapper,
                                annotation,
                                container
                            );
                }
                // 如果获取不到则看看字段是不是设置了值，如果设置了则取出
                if (dependency == null) {
                    dependency = ReflectUtil.getFieldValue(instance, field);
                }
                // 如果必须注入，但是为 null，则抛出错误
                if (dependency == null && autowired.required()) {
                    final NullPointerException exception = new NullPointerException(
                        "Target [" +
                        context.getType().getName() +
                        "::" +
                        field.getName() +
                        "] is required, but inject value is null"
                    );
                    log.error(
                        "Target [{}::{}] is required, but inject value is null",
                        context.getType().getName(),
                        field.getName()
                    );
                    throw exception;
                }
                if (writeMethod == null) {
                    // 如果没有 Setter 方法则直接用反射写入
                    // 需要注意，只有标记了 @Autowired 的字段才可以使用这种注入方式
                    ReflectUtil.setFieldValue(instance, field, dependency);
                } else {
                    // 如果有 Setter 则用 Setter 方法进行注入
                    ReflectUtil.invoke(instance, writeMethod, dependency);
                }
            }
            entry.setChanged(true);
        }
        return instance;
    }
}

```

`PropertiesValueInjector` 是用于注入配置文件的注入器：

注入规则：

- 字段标记了 `@Value` 注解。使用 `@Value` 注解注入，需要注意注入的 Properties 来源是 `@ConfigurationProperties` 和 `@PropertySource` 的设置，如果没这两个注入则是 `Environment`，也就是根配置。
- 类上有 `@ConfigurationProperties` 注解，此时就按字段上的注解或者字段名称来注入。

```java
public class PropertiesValueInjector implements InstanceInjector {
    @Override
    public Object inject(
        final Container container,
        final Object instance,
        final InjectContext context
    ) {
        for (final ChangeableEntry<Field> entry : context.getFieldEntries()) {
            if (entry.isChanged()) {
                continue;
            }
            final Field field = entry.getElement();
            final MergedAnnotation fieldAnnotation = entry.getAnnotation();
            // 看看类上有没有 @ConfigurationProperties 注解
            final boolean hasConfig = context
                .getAnnotation()
                .hasAnnotation(ConfigurationProperties.class);
            // 看看字段上有没有标记 @Value 注解
            final boolean hasValue = fieldAnnotation.hasAnnotation(Value.class);
            // 不存在 @Value 或者 @Configuration 注解的时候则无需注入
            if (!hasConfig && !hasValue) {
                continue;
            }
            // 获取 @PropertyValue 注解
            final PropertyValue propertyValue = fieldAnnotation.getAnnotation(
                PropertyValue.class
            );
            // 手动配置跳过
            if (propertyValue != null && propertyValue.skip()) {
                continue;
            }
            // 同样获取 Setter 方法
            final PropertyDescriptor propertyDescriptor = BeanUtil.getPropertyDescriptor(
                context.getType(),
                field.getName()
            );
            final Method writeMethod = propertyDescriptor == null
                ? null
                : propertyDescriptor.getWriteMethod();
            final ClassProperty property = new ClassProperty(
                instance,
                context.getType(),
                field,
                field.getName(),
                context.getAnnotation(),
                fieldAnnotation
            );
            // 获取依赖
            final Object value =
                this.resolveValue(
                        property,
                        context.getData(PropertiesProcessor.PROPERTIES),
                        context.getData(PropertiesProcessor.PROPERTIES_PREFIX),
                        container
                    );
            // 有 Write 方法就使用 Write 方法
            if (writeMethod != null) {
                ReflectUtil.invoke(instance, writeMethod, value);
            } else {
                ReflectUtil.setFieldValue(instance, field, value);
            }
            entry.setChanged(true);
        }
        return instance;
    }

    private Object resolveValue(
        final ClassProperty property,
        CompositePropertySource compositePropertySource,
        String prefix,
        final Container container
    ) {
        final MergedAnnotation classAnnotation = property.getClassAnnotation();
        final ConfigurationProperties configurationProperties = classAnnotation.getAnnotation(
            ConfigurationProperties.class
        );
        final String propertyName = property.getPropertyName();
        Object value =
            this.getValue(property, compositePropertySource, prefix, container);
        if (
            value == null &&
            !(
                configurationProperties == null ||
                configurationProperties.ignoreUnknownFields()
            )
        ) {
            final NullPointerException exception = new NullPointerException(
                "Unknown property [" + prefix + "." + propertyName + "]"
            );
            log.error("Unknown property [{}.{}]", prefix, propertyName);
            throw exception;
        }
        try {
            value = Convert.convert(property.getPropertyType(), value);
        } catch (final UtilException e) {
            if (
                !(
                    configurationProperties == null ||
                    configurationProperties.ignoreInvalidFields()
                )
            ) {
                final RuntimeException exception = new RuntimeException(
                    "Invalid property [" + prefix + "." + propertyName + "]",
                    e
                );
                log.error("Invalid property [{}.{}]", prefix, propertyName);
                throw exception;
            }
            value = ClassUtil.getDefaultValue(property.getPropertyType());
        }
        return value;
    }

    private Object getValue(
        final ClassProperty property,
        final CompositePropertySource properties,
        final String prefix,
        final Container container
    ) {
        final MergedAnnotation propertyAnnotation = property.getPropertyAnnotation();
        // 有 @Value 就优先使用
        final Value value = propertyAnnotation.getAnnotation(Value.class);
        if (value != null) {
            // 解析表达式
            return this.resolveExpression(
                    value,
                    property.getPropertyType(),
                    properties,
                    prefix,
                    container
                );
        }
        final PropertyValue propertyValue = propertyAnnotation.getAnnotation(
            PropertyValue.class
        );
        // 有 @PropertyValue 则用 @PropertyValue 里的设置
        if (propertyValue != null) {
            // 用 @PropertyValue 里的设置取得注解
            return this.resolvePropertyValue(
                    propertyValue,
                    properties,
                    prefix,
                    container,
                    property
                );
        }
        // 如果没有这些注解就默认使用字段名进行注入
        // 字段名会自动进行格式匹配，如大驼峰小驼峰的转换等等
        Object result = caseGet(property.getPropertyName(), properties::get);
        if (result == null && prefix != null && !prefix.isEmpty()) {
            result =
                caseGet(prefix + property.getPropertyName(), properties::get);
        }
        return result;
    }
}

```

然后就是 DefaultMethodInjector 了，这个是用于注入标记了 `@Autowired` 注解的方法：

```java
public class DefaultMethodInjector implements InstanceInjector {
    @Override
    public Object inject(
        final Container container,
        final Object instance,
        final InjectContext context
    ) {
        final List<Method> methods = context.getBinding().getAutowiredMethods();
        for (final Method method : methods) {
            // Set 注入
            container.call(instance, method, Object.class, context.getBinder());
        }
        return instance;
    }
}
```

### BeanProcessor

`BeanProcessor` 是在实例在构建前、构建后、销毁时进行一些额外操作的处理器，有以下 3 种处理器：

- [BeforeInjectProcessor](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/processor/BeforeInjectProcessor.java)：在实例进行构建和注入前进行一些操作，比如 `PropertiesProcessor` 提前进行一些数据收集。
- [BeanAfterCreateProcessor](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/processor/BeanAfterCreateProcessor.java)：在实例构建后进行一些操作，如创建 Aop 代理，调用 PostConstruct 方法等。
- [BeanDestroyProcessor](https://github.com/syfxlin/xkjava/blob/36b1ca22c86790b93e79a00c5b6c3e031ad6139b/xkjava-framework/src/main/java/me/ixk/framework/ioc/processor/BeanDestroyProcessor.java)：在实例销毁时进行一些操作，如调用 PreDestroy 方法。

这部分因为功能需求不高就几个实现类，这里就拿 `AopBeanProcessor` 来举个例子吧：

```java
public class AopBeanProcessor implements BeanAfterCreateProcessor {

    @Override
    public Object process(
        final Container container,
        final Object instance,
        final InjectContext context,
        final ConstructorContext constructor
    ) {
        final Class<?> instanceType = context.getType();
        // 如果实例符合 Aop 代理需求
        if (this.aspectMatches(instanceType, container)) {
            // 则返回代理过的实例
            return ProxyCreator.createAop(
                container.make(AspectManager.class),
                instance,
                instanceType,
                instanceType.getInterfaces(),
                constructor.getConstructor().getParameterTypes(),
                constructor.getArgs()
            );
        } else {
            // 否则就原路返回
            return instance;
        }
    }

    protected boolean aspectMatches(
        final Class<?> type,
        final Container container
    ) {
        // Disable proxy Advice and AspectManager
        if (
            Advice.class.isAssignableFrom(type) || type == AspectManager.class
        ) {
            return false;
        }
        // Disable some bootstrap
        if (ClassUtils.isSkipBuildType(type)) {
            return false;
        }
        final AspectManager aspectManager = container.make(AspectManager.class);
        if (aspectManager == null) {
            return false;
        }
        return aspectManager.matches(type);
    }
}
```

### Container

接下来就到了最重要的 IoC 容器部分了，有了上面的准备，容器就可以很方便的进行编写了：

```java
public class Container {
    public Container() {
        // 构造时设置默认的 DataBinder
        this.dataBinder.set(new DefaultDataBinder(new ConcurrentHashMap<>()));
        log.info("Container created");
    }

    /**
     * 销毁方法
     */
    public void destroy() {
        synchronized (this.contexts) {
            // 销毁时就取出所有的 Context，然后依次销毁
            for (String scopeType : new ArrayList<>(this.contexts.keySet())) {
                this.removeContext(scopeType);
            }
            log.info("Container destroyed");
        }
    }

    /* ===================== Context ===================== */

    public void registerContext(String scopeType, final Context context) {
        if (log.isDebugEnabled()) {
            log.debug("Container registered context: {}", scopeType);
        }
        synchronized (this.contexts) {
            // 注册 Context 就直接放到 contexts 就可以了
            this.contexts.put(scopeType, context);
        }
    }

    public void removeContext(final String scopeType) {
        synchronized (this.contexts) {
            if (log.isDebugEnabled()) {
                log.debug("Container remove context: {}", scopeType);
            }
            final Context context = this.contexts.get(scopeType);
            // 删除前检查 Context 是否启动，如果未启动就直接删掉
            if (context.isCreated()) {
                // 如果已经启动则清除对应作用域的 Binding，同时调用 BeanDestroyProcessor
                for (final Entry<String, Binding> entry : this.bindings.entrySet()) {
                    if (entry.getValue().getScope().equals(scopeType)) {
                        this.doRemove(entry.getKey());
                    }
                }
            }
            this.contexts.remove(scopeType);
        }
    }

    public Context getContextByScope(final String scopeType) {
        synchronized (this.contexts) {
            // 获取对应作用域名称的 Context
            return this.contexts.get(scopeType);
        }
    }

    /* ===================== Binding ===================== */

    protected Binding newBinding(
        final String name,
        final Class<?> instanceType,
        final String scopeType
    ) {
        return new Binding(
            this.getContextByScope(scopeType),
            name,
            instanceType,
            scopeType
        );
    }

    protected Binding newBinding(
        final String name,
        final Object instance,
        final String scopeType
    ) {
        return new Binding(
            this.getContextByScope(scopeType),
            name,
            instance,
            scopeType
        );
    }

    protected Binding newBinding(
        final String name,
        final FactoryBean<?> factoryBean,
        final String scopeType
    ) {
        return new Binding(
            this.getContextByScope(scopeType),
            name,
            factoryBean,
            scopeType
        );
    }

    public Binding getBinding(final Class<?> type) {
        // 如果是通过类型的，则需要通过类型找到最符合的名称，然后通过名称查找
        return this.getBinding(this.getBeanNameByType(type));
    }

    public Binding getBinding(String name) {
        // 如果时通过名称取得 Binding 只需要通过取得最终的名称（通过别名或最终名称寻找）
        // 然后从 bindings 取出就可以了
        return this.bindings.get(this.getCanonicalName(name));
    }

    public void setBinding(String name, final Binding binding) {
        if (log.isDebugEnabled()) {
            log.debug("Container set binding: {}", name);
        }
        synchronized (this.bindings) {
            // 设置的时候由于有可能是重复设置，所以也要取得最终名称
            name = this.getCanonicalName(name);
            // 设置到 bindings
            this.bindings.put(name, binding);
            Class<?> clazz = binding.getType();
            // 然后遍历类型，将类型设置到 bindingNamesByType
            while (clazz != null && !ClassUtils.isSkipBuildType(clazz)) {
                this.addType(name, clazz, binding.isPrimary());
                for (final Class<?> in : clazz.getInterfaces()) {
                    this.addType(name, in, binding.isPrimary());
                }
                clazz = clazz.getSuperclass();
            }
        }
    }

    protected void validHas(final String name, final String message) {
        synchronized (this.bindings) {
            // 如果名称冲突了，那就抛出异常
            if (this.has(name)) {
                throw new IllegalStateException(String.format(message, name));
            }
        }
    }

    public void removeBinding(String name) {
        if (log.isDebugEnabled()) {
            log.debug("Container remove binding: {}", name);
        }
        synchronized (this.bindings) {
            name = this.getCanonicalName(name);
            final Binding binding = this.bindings.get(name);
            if (binding == null) {
                return;
            }
            // 删除的时候也要递归的删除 bindingNamesByType 里对应的名称
            Class<?> clazz = binding.getType();
            while (clazz != null && !ClassUtils.isSkipBuildType(clazz)) {
                this.removeType(name, clazz);
                for (final Class<?> in : clazz.getInterfaces()) {
                    this.removeType(name, in);
                }
                clazz = clazz.getSuperclass();
            }
            this.removeAlias(name);
            this.bindings.remove(name);
        }
    }

    private void addType(
        final String name,
        final Class<?> type,
        final boolean isPrimary
    ) {
        this.bindingNamesByType.compute(
                type,
                (t, o) -> {
                    if (o != null) {
                        if (isPrimary) {
                            o.add(0, name);
                        } else {
                            o.add(name);
                        }
                        return o;
                    } else {
                        final List<String> list = new CopyOnWriteArrayList<>();
                        list.add(name);
                        return list;
                    }
                }
            );
    }

    private void removeType(final String name, final Class<?> type) {
        this.bindingNamesByType.computeIfPresent(
                type,
                (k, v) -> {
                    v.remove(name);
                    return v;
                }
            );
    }

    public String getBeanNameByType(final Class<?> type) {
        // 取得对应类型的名称列表
        List<String> list = this.bindingNamesByType.get(type);
        if (list == null || list.isEmpty()) {
            // 未找到或空则使用短类名作为名称
            return this.typeToBeanName(type);
        }
        // 否则取第一个返回
        return list.get(0);
    }

    public String typeToBeanName(final Class<?> type) {
        // 简单来说就是取类名，如果不是前两个字母都大写，则将类名的首字母变成小写
        final String name = type.getSimpleName();
        if (name.length() == 0) {
            return name;
        }
        if (
            name.length() > 1 &&
            Character.isUpperCase(name.charAt(1)) &&
            Character.isUpperCase(name.charAt(0))
        ) {
            return name;
        }
        final char[] chars = name.toCharArray();
        chars[0] = Character.toLowerCase(chars[0]);
        return new String(chars);
    }

    /* ======================= Bean ======================= */

    public List<String> getBeanNamesForType(final Class<?> type) {
        // 通过类型取得名称列表
        return this.bindingNamesByType.get(type);
    }

    public <T> Map<String, T> getBeanOfType(final Class<T> type) {
        // 通过类型取得名称和实例的 Map
        final List<String> list = this.getBeanNamesForType(type);
        if (list == null || list.isEmpty()) {
            return Collections.emptyMap();
        }
        return list
            .stream()
            .collect(
                Collectors.toMap(name -> name, name -> this.make(name, type))
            );
    }

    public List<String> getBeanNamesForAnnotation(
        final Class<? extends Annotation> annotationType
    ) {
        // 通过注解取得名称
        final List<String> list = new ArrayList<>();
        for (final Entry<String, Binding> entry : this.bindings.entrySet()) {
            final Class<?> type = entry.getValue().getType();
            if (
                type.isInterface() ||
                type.isEnum() ||
                type.isAnnotation() ||
                type.isPrimitive() ||
                type.isArray() ||
                entry.getValue().getAnnotation().notAnnotation(annotationType)
            ) {
                continue;
            }
            list.add(entry.getKey());
        }
        return list;
    }

    public Map<String, Object> getBeansWithAnnotation(
        final Class<? extends Annotation> annotationType
    ) {
        // 通过注解取得名称和实例的 Map
        final List<String> list =
            this.getBeanNamesForAnnotation(annotationType);
        if (list.isEmpty()) {
            return Collections.emptyMap();
        }
        final Map<String, Object> beans = new HashMap<>(list.size());
        for (final String name : list) {
            beans.put(name, this.make(name, Object.class));
        }
        return beans;
    }

    /* ===================== Alias ===================== */

    private String getCanonicalName(final String name) {
        // 取得实际名称
        // 别名只支持一层
        final String resolve = this.getAlias(name);
        if (resolve == null) {
            return name;
        }
        return resolve;
    }

    public void setAlias(final String alias, final String name) {
        if (alias == null || alias.equals(name)) {
            return;
        }
        if (log.isDebugEnabled()) {
            log.debug("Container add alias: {} => {}", alias, name);
        }
        // 二元操作，由于验证包含 alias 和 bindings，并发工具只能保护一个，所以要加锁
        synchronized (this.bindings) {
            this.validHas(alias, "Alias [%s] has contains");
            this.aliases.put(alias, name);
        }
    }

    public void removeAlias(final String alias) {
        if (log.isDebugEnabled()) {
            log.debug("Container remove alias: {}", alias);
        }
        synchronized (this.bindings) {
            this.aliases.remove(alias);
        }
    }

    public boolean hasAlias(final String alias) {
        return this.getAlias(alias) != null;
    }

    public String getAlias(final String alias) {
        return this.aliases.get(alias);
    }

    /* ===================== Process ===================== */

    protected InjectContext processBeforeInject(final Binding binding) {
        // 调用 BeforeInjectProcessor 进行前置处理
        final InjectContext context = new InjectContext(
            binding,
            this.dataBinder.get()
        );
        for (final BeforeInjectProcessor processor : this.beforeInjectProcessors) {
            processor.process(this, context);
        }
        return context;
    }

    protected Object processInstanceInjector(
        final InjectContext context,
        Object instance
    ) {
        // 调用 InstanceInjector 进行实例注入
        for (final InstanceInjector injector : this.instanceInjectors) {
            instance = injector.process(this, instance, context);
        }
        return instance;
    }

    protected Object[] processParameterInjector(
        final InjectContext context,
        Executable method
    ) {
        // 调用 ParameterInjector 进行参数注入
        Object[] dependencies = new Object[method.getParameterCount()];
        method = ClassUtils.getUserMethod(method);
        final ParameterContext parameterContext = new ParameterContext(
            context,
            method
        );
        for (final ParameterInjector injector : this.parameterInjectors) {
            dependencies =
                injector.process(this, dependencies, parameterContext);
        }
        return dependencies;
    }

    protected Object processBeanAfterCreate(
        final InjectContext context,
        Object instance,
        final Constructor<?> constructor,
        final Object[] args
    ) {
        // 调用 BeanAfterCreateProcessor 进行构建后处理
        final ConstructorContext constructorContext = new ConstructorContext(
            constructor,
            args
        );
        for (final BeanAfterCreateProcessor processor : this.beanAfterCreateProcessors) {
            instance =
                processor.process(this, instance, context, constructorContext);
        }
        return instance;
    }

    protected void processBeanDestroy(
        final Binding binding,
        final Object instance
    ) {
        // 调用 BeanDestroyProcessor 进行销毁时处理
        final InjectContext context = new InjectContext(
            binding,
            this.dataBinder.get()
        );
        for (final BeanDestroyProcessor processor : this.beanDestroyProcessors) {
            processor.process(this, instance, context);
        }
    }

    /* ===================== doBind ===================== */

    protected Binding doBind(final String name, final Binding binding) {
        if (log.isDebugEnabled()) {
            log.debug("Container bind: {} - {}", binding.getScope(), name);
        }
        // doBind 其实是个空壳方法，具体的逻辑在 setBinding
        this.setBinding(name, binding);
        return binding;
    }

    protected Binding doBind(
        final String name,
        final FactoryBean<?> factoryBean,
        final String scopeType
    ) {
        synchronized (this.bindings) {
            this.validHas(name, "Target [%s] has been bind");
            final Binding binding =
                this.newBinding(name, factoryBean, scopeType);
            return this.doBind(name, binding);
        }
    }

    protected Binding doBind(
        final String name,
        final Class<?> instanceType,
        final String scopeType
    ) {
        synchronized (this.bindings) {
            this.validHas(name, "Target [%s] has been bind");
            final Binding binding =
                this.newBinding(name, instanceType, scopeType);
            return this.doBind(name, binding);
        }
    }

    protected Binding doBind(
        final String name,
        final Object instance,
        final String scopeType
    ) {
        synchronized (this.bindings) {
            this.validHas(name, "Target [%s] has been bind");
            final Binding binding = this.newBinding(name, instance, scopeType);
            return this.doBind(name, binding);
        }
    }

    /* ===================== doBuild ===================== */

    protected Object doBuild(final Binding binding) {
        // doBuild 负责构建实例，并不参与容器的管理，所以如果调用 doBuild 创建两次单例，则这两次创建的实例不会是一样的
        final Class<?> instanceType = binding.getType();
        // 没有类型就没法构建
        if (instanceType == null) {
            return null;
        }
        if (log.isDebugEnabled()) {
            log.debug("Container build: {}", instanceType);
        }
        // 取得早期引用，用于解决循环依赖的问题
        Map<String, Object> earlyBeans = this.earlyBeans.get();
        // 如果早期引用里存在需要的实例说明发生了循环依赖的问题，此时就取出返回
        if (earlyBeans != null && earlyBeans.containsKey(binding.getName())) {
            return earlyBeans.get(binding.getName());
        }
        // 取出构造器，并进行排序，使最优的构造器能优先构造，失败了才会用其他的构造器
        final Constructor<?>[] constructors = ReflectUtils.sortConstructors(
            instanceType.getDeclaredConstructors()
        );
        Object instance;
        // 构造过程中发生的错误
        final List<Exception> errors = new ArrayList<>();
        for (final Constructor<?> constructor : constructors) {
            // 构造器有可能是私有的，要先改权限
            constructor.setAccessible(true);
            // 前置处理
            final InjectContext context = this.processBeforeInject(binding);
            // 注入参数
            final Object[] dependencies =
                this.processParameterInjector(context, constructor);
            try {
                // 实例化
                instance = constructor.newInstance(dependencies);
            } catch (final Exception e) {
                errors.add(e);
                // 如果失败了就尝试使用下一个构造器
                continue;
            }
            // 在进行下一步处理的时候先将自己存入早期引用，避免循环依赖问题
            boolean createEarlyMap = false;
            earlyBeans = this.earlyBeans.get();
            if (earlyBeans == null) {
                earlyBeans = new HashMap<>();
                earlyBeans.put(binding.getName(), instance);
                this.earlyBeans.set(earlyBeans);
                createEarlyMap = true;
            }
            try {
                // 实例注入
                instance = this.processInstanceInjector(context, instance);
                // 后置处理
                instance =
                    this.processBeanAfterCreate(
                            context,
                            instance,
                            constructor,
                            dependencies
                        );
            } finally {
                // 最终都要清理早期引用
                if (createEarlyMap) {
                    this.earlyBeans.remove();
                }
            }
            // 如果构建成功了就不是 null，此时就可以返回了
            if (instance != null) {
                return instance;
            }
        }
        // 当所有的构造器都尝试了，还是无法构建成功，则打印所有的错误
        log.error(
            "Build instance failed, use default value, Type: {}",
            instanceType
        );
        for (final Exception error : errors) {
            log.error("Build instance failed error", error);
        }
        // 同时返回对应类型的默认值
        return ClassUtil.getDefaultValue(instanceType);
    }

    /* ===================== doMake ===================== */

    protected <T> T doResolveType(
        String name,
        Class<T> returnType,
        TypeWrapper<T> typeWrapper
    ) {
        if (returnType.isArray()) {
            // 注入类型为数组，则只需要使用 ComponentType 取出对应类型的所有实例就可以了
            return Convert.convert(
                returnType,
                this.getBeanOfType(returnType.getComponentType()).values()
            );
        } else if (
            Collection.class.isAssignableFrom(returnType) &&
            returnType.isInterface()
        ) {
            // 注入集合，此时就要依靠 TypeWrapper 传入的泛型信息
            final Class<?> componentType = typeWrapper.getGeneric(0);
            // 如果泛型类没有传进来，则无法注入，直接返回 null
            if (componentType == null) {
                return null;
            }
            // 否则就按照 ComponentType 取出对应类型的所有实例就可以了
            // 比如 List<User> 那么 getGeneric(0) 就是 User，也就是 ComponentType
            return Convert.convert(
                returnType,
                this.getBeanOfType(componentType).values()
            );
        } else if (Map.class == returnType) {
            // Map 类型也是类似的，不过只支持 Map<String, T> 这样的类型
            Class<?> keyType = typeWrapper.getGeneric(0);
            if (String.class != keyType) {
                return null;
            }
            Class<?> valueType = typeWrapper.getGeneric(1);
            if (valueType == null) {
                return null;
            }
            return Convert.convert(
                returnType,
                this.getBeanOfType(valueType).values()
            );
        } else if (ObjectFactory.class == returnType) {
            // 还有 ObjectFactory，需要注意 ObjectFactory 带有 LazyLoad 效果
            final Class<?> componentType = typeWrapper.getGeneric(0);
            if (componentType == null) {
                return null;
            }
            return Convert.convert(
                returnType,
                (ObjectFactory<Object>) () -> make(name, componentType)
            );
        } else if (ObjectProvider.class == returnType) {
            // ObjectFactory 的高级版一样的操作
            final Class<?> componentType = typeWrapper.getGeneric(0);
            if (componentType == null) {
                return null;
            }
            return Convert.convert(
                returnType,
                new ObjectProvider<>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public Collection<Object> getObjects() {
                        return (Collection<Object>) getBeanOfType(componentType)
                            .values();
                    }

                    @Override
                    public Object getObject() {
                        return make(name, componentType);
                    }
                }
            );
        }
        return null;
    }

    protected <T> T doMake(final String name, final Class<T> returnType) {
        return this.doMake(name, TypeWrapper.forClass(returnType));
    }

    @SuppressWarnings("unchecked")
    protected <T> T doMake(
        final String name,
        final TypeWrapper<T> typeWrapper
    ) {
        // 获取依赖（依赖查找）
        Class<T> returnType = typeWrapper.getClazz();
        if (log.isDebugEnabled()) {
            log.debug("Container make: {} - {}", name, returnType);
        }
        // 首先取得 Binding
        Binding binding = name == null ? null : this.getBinding(name);
        // Binding 未找到
        if (binding == null) {
            // 有可能是复合类型，则尝试获取
            final T resolved =
                this.doResolveType(name, returnType, typeWrapper);
            if (resolved != null) {
                return resolved;
            }
            // 如果没有就尝试通过类型取得 Binding
            if (ClassUtils.isSkipBuildType(returnType)) {
                return (T) ClassUtil.getDefaultValue(returnType);
            } else {
                binding = this.getBinding(this.getBeanNameByType(returnType));
            }
        }
        if (binding == null) {
            // 如果都没找到就新建 Binding，不过这个 Binding 不会存入 IoC 容器，是临时的
            binding = this.newBinding(name, returnType, ScopeType.PROTOTYPE);
        }
        // 是否需要代理，比如 Field 是需要代理的
        boolean proxy = typeWrapper.useProxy();
        // 取得对应的实例
        Object instance = binding.getSource(proxy);
        if (instance != null) {
            return Convert.convert(returnType, instance);
        }
        // 加锁，双重检查，防止二次初始化
        synchronized (binding.getMutex()) {
            instance = binding.getSource(proxy);
            if (instance != null) {
                return Convert.convert(returnType, instance);
            }
            // 如果还是没取得实例，说明实例并未构建，此时就进入构建流程
            Binding finalBinding = binding;
            try {
                // 取出 FactoryBean，如果没有就使用默认的 FactoryBean，也就是 doBuild
                FactoryBean<?> factoryBean = binding.getFactoryBean();
                if (factoryBean == null) {
                    factoryBean =
                        new FactoryBean<>() {
                            @Override
                            public Object getObject() {
                                return doBuild(finalBinding);
                            }

                            @Override
                            public Class<?> getObjectType() {
                                return finalBinding.getType();
                            }
                        };
                }
                instance = factoryBean.getObject();
            } catch (final Throwable e) {
                throw new ContainerException("Instance make failed", e);
            }
            T returnInstance = Convert.convert(returnType, instance);
            // 如果是共享的，也就是单例，则将单例设置到 Context 里
            if (binding.isShared()) {
                binding.setSource(returnInstance);
            }
            return returnInstance;
        }
    }

    /* ===================== doRemove ===================== */

    protected void doRemove(final String name) {
        if (log.isDebugEnabled()) {
            log.debug("Container remove: {}", name);
        }
        synchronized (this.bindings) {
            final Binding binding = this.getBinding(name);
            // 删除就看看实例构建了吗，如果构建了就调用 BeanDestroyProcessor 进行销毁时处理
            if (binding.isCreated()) {
                this.processBeanDestroy(binding, binding.getSource());
            }
            // 然后删除 Binding
            this.removeBinding(name);
        }
    }
}

```

`Container` 里较为重要的方法都已经通过注解说清楚了。不过有些不重要的部分这里就不贴了，主要是代码太长了 2333。

## 结语

到这里 XK-Java 的 IoC 容器部分就写完了。

文章十几天了终于肝完了，主要也是内容比较多，也相对复杂，和上次的 XK-PHP 相比简直是小巫见大巫。所以文中可能会有错误，同时毕竟我也不是什么业界大佬，没有丰富的经验，代码里可能有挺多错误，如果你发现了错误可以在底下评论。溜了溜了 🤣。